
<?php
error_reporting(E_ALL);
ini_set('display_errors', "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => '', 'user_details' => [], 'data' => []];
$input = json_decode(file_get_contents('php://input'), true);
try {
  $query = "SELECT table_name FROM ticket_booking_management.INFORMATION_SCHEMA.TABLES WHERE table_schema='public'";
  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $response["status"] = true;
  $response["message"] = "successful";
  $response["data"] = $result;
  echo empty($input["token"]);
  if (!empty($input["token"])) {
    $token = $input["token"];
    $query = "SELECT * FROM users WHERE access_token=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $response["user_details"] = $result;
    echo json_encode($response);
  } else {
    $response["status"] = false;
    echo json_encode($response);
  }
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
