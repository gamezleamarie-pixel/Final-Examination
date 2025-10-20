<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ===============================
// Dependencies
// ===============================
include_once __DIR__ . "/../config/Database.php";
include_once __DIR__ . "/../models/Booking.php";
include_once __DIR__ . "/../helpers/Response.php"; // Optional but recommended

// ===============================
// Initialize Database & Model
// ===============================
$database = new Database();
$db = $database->connect();
$booking = new Booking($db);

// ===============================
// Routing by Request Method
// ===============================
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // -----------------------------
    // READ BOOKINGS
    // -----------------------------
    case 'GET':
        header('Content-Type: application/json');
        $search = $_GET['search'] ?? '';
        $result = $booking->read($search);
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;

    // -----------------------------
    // CREATE BOOKING
    // -----------------------------
    case 'POST':
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"));
        if (!$data) {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
            exit;
        }
        $booking->customer_name = $data->customer_name;
        $booking->room_type = $data->room_type;
        $booking->check_in = $data->check_in;
        $booking->check_out = $data->check_out;
        $booking->status = $data->status;
        echo json_encode(["success" => $booking->create()]);
        break;

    // -----------------------------
    // UPDATE BOOKING
    // -----------------------------
    case 'PUT':
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"));
        if (!$data || !isset($data->id)) {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
            exit;
        }
        $booking->id = $data->id;
        $booking->customer_name = $data->customer_name;
        $booking->room_type = $data->room_type;
        $booking->check_in = $data->check_in;
        $booking->check_out = $data->check_out;
        $booking->status = $data->status;
        echo json_encode(["success" => $booking->update()]);
        break;

    // -----------------------------
    // DELETE BOOKING
    // -----------------------------
    case 'DELETE':
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"));
        if (!$data || !isset($data->id)) {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
            exit;
        }
        $booking->id = $data->id;
        echo json_encode(["success" => $booking->delete()]);
        break;

    // -----------------------------
    // UNSUPPORTED METHOD
    // -----------------------------
    default:
        header('Content-Type: application/json');
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
        break;
}
?>
