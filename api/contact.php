<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Asegurate que exista /api/data y que tenga permisos de escritura
ini_set('error_log', __DIR__ . '/data/php_errors.log.txt');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Pinta MKT – Contact API (SMTP via PHPMailer)
 */

header("Content-Type: application/json; charset=UTF-8");

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

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["status" => "error", "message" => "Invalid fields"]);
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
  $mail->isSMTP();
  $mail->Host       = "c2801498.ferozo.com";
  $mail->SMTPAuth   = true;
  $mail->Username   = "info@pintamkt.online";
  $mail->Password   = "zly*3W68bM";
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port       = 465;

  $mail->setFrom("info@pintamkt.online", "Pinta MKT");
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
$mail->SMTPDebug = 2;
$mail->Debugoutput = function($str, $level) {
  file_put_contents(__DIR__ . '/data/php_errors.log.txt', $str . PHP_EOL, FILE_APPEND);
};

  $mail->send();

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "SMTP error",
    "detail" => $mail->ErrorInfo
  ]);
  exit;
}

echo json_encode(["status" => "success", "message" => "Lead processed"]);
