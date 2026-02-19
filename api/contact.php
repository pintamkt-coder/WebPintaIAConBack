<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/data/php_errors.log.txt');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json; charset=UTF-8");

// ===== LOAD SECRETS =====
// Opción A (fuera de public_html) - ajustá el path real si aplica:
$secretsPathA = dirname($_SERVER['DOCUMENT_ROOT']) . "/pinta_secrets.php";

// Opción B (dentro de /api):
$secretsPathB = __DIR__ . "/secrets.php";

$secretsFile = file_exists($secretsPathA) ? $secretsPathA : $secretsPathB;

if (!file_exists($secretsFile)) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Secrets file missing"]);
  exit;
}

$SECRETS = require $secretsFile;

$RECAPTCHA_SECRET = $SECRETS["RECAPTCHA_SECRET"] ?? null;
$SMTP_HOST = $SECRETS["SMTP_HOST"] ?? null;
$SMTP_USER = $SECRETS["SMTP_USER"] ?? null;
$SMTP_PASS = $SECRETS["SMTP_PASS"] ?? null;
$SMTP_PORT = (int)($SECRETS["SMTP_PORT"] ?? 465);

if (!$RECAPTCHA_SECRET || !$SMTP_HOST || !$SMTP_USER || !$SMTP_PASS) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Secrets not configured"]);
  exit;
}

// ===== CORS =====
$allowed_origins = [
  "https://pintamkt.online",
  "https://www.pintamkt.online"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  echo json_encode(["ok" => true]);
  exit;
}

// ===== LOAD PHPMailer =====
require __DIR__ . "/vendor/phpmailer/src/Exception.php";
require __DIR__ . "/vendor/phpmailer/src/PHPMailer.php";
require __DIR__ . "/vendor/phpmailer/src/SMTP.php";

// ===== VALID METHOD =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Method not allowed"]);
  exit;
}

// ===== READ BODY =====
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
  exit;
}

$name  = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$msg   = trim($data['message'] ?? '');
$ai    = trim($data['ai_analysis'] ?? '');
$token = trim($data['recaptcha_token'] ?? '');

if ($token === '') {
  http_response_code(422);
  echo json_encode(["status" => "error", "message" => "Missing recaptcha token"]);
  exit;
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["status" => "error", "message" => "Invalid fields"]);
  exit;
}

// ===== VERIFY RECAPTCHA =====
$verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
$payload = [
  "secret" => $RECAPTCHA_SECRET,
  "response" => $token,
  "remoteip" => $_SERVER["REMOTE_ADDR"] ?? ""
];

$ch = curl_init($verifyUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
$result = curl_exec($ch);
curl_close($ch);

$captcha = json_decode($result, true);

if (!isset($captcha["success"]) || $captcha["success"] !== true) {
  http_response_code(403);
  echo json_encode([
    "status" => "error",
    "message" => "Recaptcha failed",
    "detail" => $captcha
  ]);
  exit;
}

// ===== SAVE LEAD =====
$data_dir = __DIR__ . "/../data";
$log_file = $data_dir . "/leads.json";

if (!is_dir($data_dir)) {
  mkdir($data_dir, 0755, true);
}

$leads = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];
$leads[] = [
  "date" => date("Y-m-d H:i:s"),
  "name" => htmlspecialchars($name),
  "email" => $email,
  "message" => htmlspecialchars($msg),
  "ai_analysis" => htmlspecialchars($ai),
];
file_put_contents($log_file, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ===== SEND EMAIL (SMTP) =====
try {
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->isSMTP();
  $mail->SMTPDebug = 0; // IMPORTANTE: 0 en producción
  $mail->Host       = $SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $SMTP_USER;
  $mail->Password   = $SMTP_PASS;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port       = $SMTP_PORT;

  $mail->Encoding = 'base64';
  $mail->SMTPOptions = [
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true
    ]
  ];

  $mail->setFrom($SMTP_USER, "Pinta MKT");
  $mail->addAddress("pintamkt@gmail.com");
  $mail->addAddress("Emilia@pintamkt.com");
  $mail->addReplyTo($email, $name);

  $mail->isHTML(false);
  $mail->Subject = "Nuevo contacto de Pinta MKT";
  $mail->Body =
    "Nombre: {$name}\n" .
    "Email: {$email}\n\n" .
    "Mensaje:\n{$msg}\n\n" .
    "--- IA ---\n{$ai}\n";

  $mail->send();

  echo json_encode([
    "status" => "success",
    "message" => "Lead processed"
  ]);
  exit;

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "SMTP error",
    "detail" => $mail->ErrorInfo
  ]);
  exit;
}
