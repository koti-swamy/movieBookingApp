<?PHP

error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbconfig.php';

// register

$response = ["status" => false, "message" => ""];

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['firstName'])) {
  $response["status"] = false;
  $response["message"] = "First name is required";
  echo json_encode($response);
  exit;
}
if (empty($input['lastName'])) {
  $response["status"] = false;
  $response["message"] = "Last name is required";
  echo json_encode($response);
  exit;
}
if (empty($input['email'])) {
  $response["status"] = false;
  $response["message"] = "Email is required";
  echo json_encode($response);
  exit;
}
if (empty($input['password'])) {
  $response["status"] = false;
  $response["message"] = "Password is required";
  echo json_encode($response);
  exit;
}


$firstName = $input["firstName"];

$lastName = $input["lastName"];

$email = $input["email"];

$password = md5($input["password"]);

$query = "SELECT * FROM users WHERE email='$email'";

$stmt = $pdo->query($query);

$result = $stmt->fetch();

if ($result && $result["id"]) {
  $response["status"] = false;
  $response["message"] = "User already exists";
  echo json_encode($response);
  exit;
}

try {
  $query = "INSERT INTO users(firstname,lastname,email,password) VALUES('$firstName','$lastName','$email','$password')";
  $stmt = $pdo->prepare($query);
  $result = $stmt->execute();
  $response["status"] = true;
  $response["message"] = "User Successfully registered";
  echo json_encode($response);
} catch (PDOException $e) {
  $response["status"] = false;
  $response["message"] = $e->getMessage();
  echo json_encode($response);
}
