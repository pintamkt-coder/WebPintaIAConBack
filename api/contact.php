<?php
/**
 * contact.php - Pinta MKT Backend API
 * DonWeb / Ferozo
 */

// ✅ Siempre JSON
header("Content-Type: application/json; charset=UTF-8");

// ===============================
// DEBUG MODE (server-side logs)
// ===============================
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// directorio de logs (y leads)
$log_dir = __DIR__ . "/../data";
if (!file_exists($log_dir)) { @mkdir($log_dir, 0755, true); }
ini_set('error_log', $log_dir . "/php_errors.log");

// ping para confirmar que el script corre
@file_put_contents($log_dir . "/ping.log", date("c") . " HIT\n", FILE_APPEND);

// ===============================
// 1) CORS
// ===============================
$allowed_origins = [
  "https://pintamkt.online",
  "https://www.pintamkt.online",
  "https://l0090660.ferozo.com",
  "https://pintamkt.store",
  "https://www.pintamkt.store",
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

// ===============================
// 2) Config
// ===============================
$agency_emails = "pintamkt@gmail.com, Emilia@pintamkt.com";
$log_file = $log_dir . "/leads.json";

// IMPORTANTE: From tiene que existir como casilla real en tu hosting
$from_email = "info@pintamkt.store"; 
$from_name  = "Pinta MKT";

// método permitido
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Method not allowed"]);
  exit;
}

// ===============================
// 3) Validación de permisos
// ===============================
if (!is_dir($log_dir) || !is_writable($log_dir)) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Data dir not writable",
    "dir" => $log_dir
  ]);
  exit;
}

// ===============================
// 4) Procesamiento POST
// ===============================
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

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["status" => "error", "message" => "Fields required"]);
  exit;
}

// sanitizado
$name_s    = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email_s   = filter_var($email, FILTER_SANITIZE_EMAIL);
$message_s = filter_var($message, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ai_s      = filter_var($ai_analysis, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// ===============================
// 5) Persistencia (leads.json)
// ===============================
$leads = [];
if (file_exists($log_file)) {
  $tmp = json_decode(file_get_contents($log_file), true);
  if (is_array($tmp)) $leads = $tmp;
}

$leads[] = [
  "id" => uniqid(),
  "date" => date("Y-m-d H:i:s"),
  "name" => $name_s,
  "email" => $email_s,
  "message" => $message_s,
  "ai_analysis" => $ai_s
];

$ok = @file_put_contents(
  $log_file,
  json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

if ($ok === false) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Failed writing leads.json"]);
  exit;
}

// ===============================
// 6) Email
// ===============================
$subject = "🐝 PINTA MKT - NUEVO CONTACTO: " . $name_s;
$body =
"Contacto desde la web:\n\n" .
"Nombre: {$name_s}\n" .
"Email: {$email_s}\n" .
"Mensaje: {$message_s}\n\n" .
"--- IA ---\n{$ai_s}\n";

$headers  = "From: {$from_name} <{$from_email}>\r\n";
$headers .= "Reply-To: {$email_s}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($agency_emails, $subject, $body, $headers);

if (!$sent) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Mail failed",
    "hint" => "Revisar si mail() está habilitado en el hosting y si el From existe como casilla real."
  ]);
  exit;
}

// ✅ OK
echo json_encode(["status" => "success", "message" => "Lead processed"]);
