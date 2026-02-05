
<?php
/**
 * Pinta MKT - Backend API for Lead Management
 */

// 1. Security Headers & CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Configuration - Enviar a ambos correos
$agency_emails = "pintamkt@gmail.com, Emilia@pintamkt.com";
$log_file = __DIR__ . "/../data/leads.json";

// 3. Request Processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
        http_response_code(400);
        exit;
    }

    // 4. Validation
    $name    = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
    $email   = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = filter_var($data['message'] ?? $data['details'] ?? '', FILTER_SANITIZE_STRING);
    $service = filter_var($data['service'] ?? 'General Inquiry', FILTER_SANITIZE_STRING);
    $ai_analysis = filter_var($data['ai_analysis'] ?? '', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Missing or invalid required fields."]);
        http_response_code(422);
        exit;
    }

    // 5. Data Persistence
    $lead_entry = [
        "id" => uniqid("pinta_"),
        "date" => date("Y-m-d H:i:s"),
        "name" => $name,
        "email" => $email,
        "service" => $service,
        "message" => $message,
        "ai_analysis" => $ai_analysis
    ];

    if (!file_exists(__DIR__ . "/../data")) {
        mkdir(__DIR__ . "/../data", 0755, true);
    }

    $existing_leads = [];
    if (file_exists($log_file)) {
        $existing_leads = json_decode(file_get_contents($log_file), true) ?: [];
    }
    $existing_leads[] = $lead_entry;
    file_put_contents($log_file, json_encode($existing_leads, JSON_PRETTY_PRINT));

    // 6. Email Notification
    $subject = "🐝 NUEVO LEAD: " . $name . " - " . $service;
    $email_body = "Has recibido un nuevo contacto desde la web de Pinta MKT.\n\n";
    $email_body .= "Nombre: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Servicio: $service\n";
    $email_body .= "Mensaje: $message\n\n";
    $email_body .= "--- Análisis de IA ---\n$ai_analysis\n";

    $headers = "From: no-reply@pintamkt.online\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $mail_sent = @mail($agency_emails, $subject, $email_body, $headers);

    echo json_encode([
        "status" => "success",
        "message" => "Lead processed.",
        "mail_sent" => $mail_sent
    ]);

} else {
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
    http_response_code(405);
}
?>
