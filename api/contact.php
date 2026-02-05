
<?php
/**
 * Pinta MKT - Backend API for Lead Management
 * Optimized for DonWeb / Ferozo Deployment
 */

// 1. CORS dinámico para permitir múltiples dominios de Pinta MKT
$allowed_origins = [
  "https://pintamkt.online",
  "https://www.pintamkt.online",
  "https://l0090660.ferozo.com",
  "http://pintamkt.online",
  "http://www.pintamkt.online"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
} else {
  // Si no viene Origin (curl/postman) no pasa nada; si viene de otro, no habilites
  // Podés dejarlo sin else para ser más estricto
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  echo json_encode(["ok" => true]);
  exit;
}

// 2. Configuración
$agency_emails = "pintamkt@gmail.com, Emilia@pintamkt.com";
$log_file = __DIR__ . "/../data/leads.json";

// 3. Procesamiento
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON received."]);
        http_response_code(400);
        exit;
    }

    $name    = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
    $email   = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);
    $ai_analysis = filter_var($data['ai_analysis'] ?? '', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Fields required."]);
        http_response_code(422);
        exit;
    }

    // Persistencia
    if (!file_exists(__DIR__ . "/../data")) mkdir(__DIR__ . "/../data", 0755, true);
    $entry = ["id" => uniqid(), "date" => date("Y-m-d H:i:s"), "name" => $name, "email" => $email, "message" => $message, "ai_analysis" => $ai_analysis];
    $leads = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];
    $leads[] = $entry;
    file_put_contents($log_file, json_encode($leads, JSON_PRETTY_PRINT));

    // Notificación Email
    $subject = "🐝 PINTA MKT - NUEVO CONTACTO: " . $name;
    $body = "Contacto desde la web:\n\nNombre: $name\nEmail: $email\nMensaje: $message\n\n--- IA ---\n$ai_analysis";
    
    // El remitente debe ser una cuenta del dominio para evitar Spam
    $headers = "From: no-reply@pintamkt.online\r\n";
    $headers .= "Reply-To: $email\r\n";

    @mail($agency_emails, $subject, $body, $headers);

    echo json_encode(["status" => "success", "message" => "Lead processed"]);
} else {
    http_response_code(405);
}
?>
