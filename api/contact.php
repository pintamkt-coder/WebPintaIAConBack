<?php
/**
 * contact.php - Pinta MKT Backend API (Debug + Shutdown Logger)
 * DonWeb / Ferozo
 */

header("Content-Type: application/json; charset=UTF-8");

// ====== CONFIG ======
$agency_emails = "pintamkt@gmail.com, Emilia@pintamkt.com";

// From debe EXISTIR como casilla real en el hosting
$from_email = "info@pintamkt.store";
$from_name  = "Pinta MKT";

// Rutas
$data_dir   = __DIR__ . "/../data";
$leads_file = $data_dir . "/leads.json";
$debug_file = $data_dir . "/debug_contact.log";

// Toggle: para probar si el 500 desaparece sin mail()
$ENABLE_MAIL = true; // ponelo en false 1 minuto para validar

// ====== HELPERS ======
$__STAGE = "boot";

function debug_log($file, $msg) {
  @file_put_contents($file, date("c") . " | " . $msg . "\n", FILE_APPEND);
}

function respond($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// Loguear fatal errors aunque el script muera
register_shutdown_function(function() use ($debug_file, &$__STAGE) {
  $err = error_get_last();
  if ($err) {
    debug_log($debug_file, "FATAL stage={$__STAGE} type={$err['type']} msg={$err['message']} file={$err['file']} line={$err['line']}");
  } else {
    debug_log($debug_file, "SHUTDOWN stage={$__STAGE} ok");
  }
});

// ====== Ensure data dir ======
if (!file_exists($data_dir)) {
  @mkdir($data_dir, 0755, true);
}
$writable = is_dir($data_dir) && is_writable($data_dir);
if (!$writable) {
  respond(500, ["status" => "error", "message" => "Data dir not writable", "data_dir" => $data_dir]);
}

debug_log($debug_file, "HIT method=" . ($_SERVER['REQUEST_METHOD'] ?? ''));

// ====== CORS ======
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

// ====== Read body ======
$__STAGE = "read_body";
debug_log($debug_file, "stage=read_body");

$raw = file_get_contents("php://input");
if ($raw === false || trim($raw) === "") {
  respond(400, ["status" => "error", "message" => "Empty body", "stage" => "read_body"]);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  debug_log($debug_file, "json_fail raw=" . substr($raw, 0, 300));
  respond(400, ["status" => "error", "message" => "Invalid JSON", "stage" => "json_decode"]);
}

// ====== Validate ======
$__STAGE = "validate";
debug_log($debug_file, "stage=validate");

$name        = trim((string)($data['name'] ?? ''));
$email       = trim((string)($data['email'] ?? ''));
$message     = trim((string)($data['message'] ?? ''));
$ai_analysis = trim((string)($data['ai_analysis'] ?? ''));

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(422, ["status" => "error", "message" => "Fields required", "stage" => "validate"]);
}

$name_s    = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email_s   = filter_var($email, FILTER_SANITIZE_EMAIL);
$message_s = filter_var($message, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ai_s      = filter_var($ai_analysis, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// ====== Save lead ======
$__STAGE = "save_lead";
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
  debug_log($debug_file, "save_lead_fail leads_file={$leads_file}");
  respond(500, ["status" => "error", "message" => "Failed writing leads.json", "stage" => "save_lead"]);
}

// ====== Mail ======
$__STAGE = "mail";
debug_log($debug_file, "stage=mail enable=" . ($ENABLE_MAIL ? "1" : "0"));

if (!$ENABLE_MAIL) {
  // Para testear: si esto devuelve 200 y desaparece el 500, el culpable es mail().
  respond(200, ["status" => "success", "message" => "Lead saved (mail disabled)", "stage" => "ok_no_mail"]);
}

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

// Recomendado en hostings: envelope sender (-f)
$extra_params = "-f{$from_email}";

// Limitar tiempo por si mail() cuelga
@set_time_limit(10);
@ini_set("default_socket_timeout", "10");

$start = microtime(true);
$mail_sent = @mail($agency_emails, $subject, $body, $headers, $extra_params);
$elapsed = round((microtime(true) - $start) * 1000);

debug_log($debug_file, "mail_done sent=" . ($mail_sent ? "1" : "0") . " ms={$elapsed}");

if (!$mail_sent) {
  respond(500, [
    "status" => "error",
    "message" => "Mail failed",
    "stage" => "mail",
    "from" => $from_email
  ]);
}

respond(200, ["status" => "success", "message" => "Lead processed", "stage" => "ok"]);
