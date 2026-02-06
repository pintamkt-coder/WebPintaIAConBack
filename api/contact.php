<?php
/**
 * Pinta MKT - Contact API (DonWeb/Ferozo)
 * - CORS OK
 * - Guarda lead en /api/data/leads.json
 * - Envía email por SMTP (PHPMailer) para evitar bloqueo de mail()
 */

header("Content-Type: application/json; charset=UTF-8");

// ======================
// 0) DEBUG LOG (opcional)
// ======================
$debug_log = __DIR__ . "/debug_contact.log";
function dlog($msg) {
  global $debug_log;
  @file_put_contents($debug_log, date("c") . " | " . $msg . "\n", FILE_APPEND);
}
dlog("HIT method=" . ($_SERVER['REQUEST_METHOD'] ?? 'unknown'));

// ======================
// 1) CORS
// ======================
$allowed_origins = [
  "https://pintamkt.online",
  "https://www.pintamkt.online",
  "https://pintamkt.store",
  "https://www.pintamkt.store",
  "https://l0090660.ferozo.com",
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Max-Age: 86400");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  echo json_encode(["ok" => true]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Method not allowed"]);
  exit;
}

// ======================
// 2) CONFIG
// ======================
$agency_emails = ["pintamkt@gmail.com", "Emilia@pintamkt.com"];
$log_dir = __DIR__ . "/data";
$log_file = $log_dir . "/leads.json";

// Remitente (tiene que existir como casilla real)
$from_email = "info@pintamkt.store";
$from_name  = "Pinta MKT";

// SMTP (COMPLETAR CON DATOS REALES)
$SMTP_HOST = "mail.pintamkt.store";   // <- EJEMPLO (cambialo por el real si es otro)
$SMTP_PORT = 587;                    // 587 (STARTTLS) o 465 (SSL)
$SMTP_USER = "info@pintamkt.store";  // casilla real
$SMTP_PASS = "PONER_PASSWORD_AQUI";  // password real
$SMTP_SECURE = "tls";                // "tls" para 587, "ssl" para 465

dlog("stage=read_body");

// ======================
// 3) READ BODY
// ======================
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "Invalid JSON received"]);
  exit;
}

$name        = trim((string)($data['name'] ?? ''));
$email       = trim((string)($data['email'] ?? ''));
$message     = trim((string)($data['message'] ?? ''));
$ai_analysis = trim((string)($data['ai_analysis'] ?? ''));

dlog("stage=validate");

// ======================
// 4) VALIDATE
// ======================
if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["status" => "error", "message" => "Fields required"]);
  exit;
}

// Sanitizado
$name_s    = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email_s   = filter_var($email, FILTER_SANITIZE_EMAIL);
$message_s = filter_var($message, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ai_s      = filter_var($ai_analysis, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

dlog("stage=save_lead");

// ======================
// 5) SAVE LEAD
// ======================
if (!file_exists($log_dir)) {
  mkdir($log_dir, 0755, true);
}

$entry = [
  "id" => uniqid(),
  "date" => date("Y-m-d H:i:s"),
  "name" => $name_s,
  "email" => $email_s,
  "message" => $message_s,
  "ai_analysis" => $ai_s
];

$leads = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];
if (!is_array($leads)) $leads = [];
$leads[] = $entry;

file_put_contents($log_file, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

dlog("stage=mail_smtp");

// ======================
// 6) SEND EMAIL (SMTP)
// ======================
require_once __DIR__ . "/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$subject = "🐝 PINTA MKT - NUEVO CONTACTO: " . $name_s;
$body =
"Contacto desde la web:\n\n" .
"Nombre: {$name_s}\n" .
"Email: {$email_s}\n" .
"Mensaje: {$message_s}\n\n" .
"--- IA ---\n{$ai_s}\n";

try {
  $mail = new PHPMailer(true);

  // Debug SMTP si querés (dejar en 0 normalmente)
  $mail->SMTPDebug = 0;

  $mail->isSMTP();
  $mail->Host       = $SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $SMTP_USER;
  $mail->Password   = $SMTP_PASS;
  $mail->SMTPSecure = $SMTP_SECURE;
  $mail->Port       = $SMTP_PORT;

  // From / Reply-To
  $mail->setFrom($from_email, $from_name);
  $mail->addReplyTo($email_s, $name_s);

  // Destinatarios
  foreach ($agency_emails as $to) {
    $mail->addAddress($to);
  }

  // Contenido
  $mail->Subject = $subject;
  $mail->Body    = $body;

  $mail->send();

  dlog("mail_done sent=1");

  echo json_encode(["status" => "success", "message" => "Lead processed"]);
  exit;

} catch (Exception $e) {
  dlog("FATAL smtp_error=" . $mail->ErrorInfo);
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "SMTP failed",
    "detail" => $mail->ErrorInfo
  ]);
  exit;
}
