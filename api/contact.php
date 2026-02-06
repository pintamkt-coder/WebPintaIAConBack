<?php
/**
 * contact.php - Pinta MKT Backend API (Debug Brutal)
 * DonWeb / Ferozo
 */

header("Content-Type: application/json; charset=UTF-8");

// ============ CONFIG ============
$agency_emails = "pintamkt@gmail.com, Emilia@pintamkt.com";

// From debe EXISTIR como casilla real en el hosting
$from_email = "info@pintamkt.store";
$from_name  = "Pinta MKT";

// data dir / logs
$data_dir = __DIR__ . "/../data";
$leads_file = $data_dir . "/leads.json";
$debug_file = $data_dir . "/debug_contact.log";

// ============ HELPERS ============
function debug_log($file, $msg) {
  @file_put_contents($file, date("c") . " | " . $msg . "\n", FILE_APPEND);
}

function respond($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// ============ ENSURE DATA DIR ============
if (!file_exists($data_dir)) {
  @mkdir($data_dir, 0755, true);
}

// si no puedo escribir ni el log, ya estamos mal
$writable = is_dir($data_dir) && is_writable($data_dir);

// log inicial SIEMPRE
if ($writable) {
  debug_log($debug_file, "HIT - method=" . ($_SERVER['REQUEST_METHOD'] ?? ''));
}

// ============ CORS ============
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

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  respond(200, ["ok" => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ["status" => "error", "message" => "Method not allowed"]);
}

if (!$writable) {
  respond(500, [
    "status" => "error",
    "message" => "Data dir not writable",
    "data_dir" => $data_dir,
    "writable" => $writable
  ]);
}

// ============ READ BODY ============
debug_log($debug_file, "stage=read_body");
$raw = file_get_contents("php://input");
if ($raw === false || trim($raw) === "") {
  debug_log($debug_file, "stage=read_body_fail raw_empty");
  respond(400, ["status" => "error", "message" => "Empty body", "stage" => "read_body"]);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  debug_log($debug_file, "stage=json_fail raw=" . substr($raw, 0, 300));
  respond(400, ["status" => "error", "message" => "Invalid JSON", "stage" => "json_decode"]);
}

// ============ VALIDATE ============
debug_log($debug_file, "stage=validate");

$name        = trim((string)($data['name'] ?? ''));
$email       = trim((string)($data['email'] ?? ''));
$message     = trim((string)($data['message'] ?? ''));
$ai_analysis = trim((string)($data['ai_analysis'] ?? ''));

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(422, ["status" => "error", "message" => "Fields required", "stage" => "validate"]);
}

// sanitize
$name_s    = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email_s   = filter_var($email, FILTER_SANITIZE_EMAIL);
$message_s = filter_var($message, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ai_s      = filter_var($ai_analysis, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// ============ SAVE LEAD ============
debug_log($debug_file, "stage=save_lead");

$leads = [];
if (file_exists($leads_file)) {
  $tmp = json_decode(@file_get_contents($leads_file), true);
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

$write_ok = @file_put_contents(
  $leads_file,
  json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

if ($write_ok === false) {
  debug_log($debug_file, "stage=save_lead_fail leads_file=" . $leads_file);
  respond(500, ["status" => "error", "message" => "Failed writing leads.json", "stage" => "save_lead"]);
}

// ============ SEND MAIL ============
debug_log($debug_file, "stage=mail");

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

// MUY IMPORTANTE: en algunos hostings mail() está apagado
$mail_sent = @mail($agency_emails, $subject, $body, $headers);

debug_log($debug_file, "mail_sent=" . ($mail_sent ? "1" : "0"));

if (!$mail_sent) {
  // AUNQUE FALLE EL MAIL, te devolvemos JSON con detalle
  respond(500, [
    "status" => "error",
    "message" => "Mail failed",
    "stage" => "mail",
    "mail_sent" => false,
    "from_email" => $from_email
  ]);
}

// ============ OK ============
respond(200, [
  "status" => "success",
  "message" => "Lead processed",
  "stage" => "ok",
  "mail_sent" => true
]);
