<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");
include "dbconfig.php";

$response = ['status' => false, 'message' => '', 'token' => ''];

$input = json_decode(file_get_contents('php://input'),true);

if (empty($input["email"])) {
  $response["status"] = false;
  $response["message"] = "Email required";
  echo json_encode($response);
  exit;
}
if (empty($input["password"])) {
  $response["status"] = false;
  $response["message"] = "Password required";
  echo json_encode($response);
  exit;
}

$email = $input["email"];

$password = md5($input["password"]);

$query = "SELECT * FROM users WHERE email='$email' AND password='$password' ";

$stmt = $pdo->prepare($query);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result["id"]) {
  $token = generateRandomString(15);
  $query = "UPDATE users SET access_token='$token', status='login' WHERE email='$email'";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute();
  $response["status"] = true;
  $response["message"] = "Login successful";
  $response["token"] = $token;
  echo json_encode($response);
  exit;
} else {
  $response["status"] = false;
  $response["message"] = "Email or password is invalid";
  echo json_encode($response);
}

function generateRandomString($length)
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charLen = strlen($characters);
  $randomStr = '';
  for ($i = 0; $i < $length; $i++) {
    $randomStr .= $characters[random_int(0, $charLen - 1)];
  }
  return $randomStr;
}
