<?php
$mysqli = new mysqli("localhost", "root", "", "lms");
header("Content-Type: application/json");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối thất bại: " . $mysqli->connect_error]);
    exit;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case "list":
        $result = $mysqli->query("SELECT id, username, role, email FROM accounts ORDER BY id ASC");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

    case "add":
        $stmt = $mysqli->prepare("INSERT INTO accounts (username, password, role, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $_POST['username'], $_POST['password'], $_POST['role'], $_POST['email']);
        $stmt->execute();
        echo json_encode(["status" => "added"]);
        break;

    case "edit":
        $stmt = $mysqli->prepare("UPDATE accounts SET username=?, role=?, email=? WHERE id=?");
        $stmt->bind_param("sssi", $_POST['username'], $_POST['role'], $_POST['email'], $_POST['id']);
        $stmt->execute();
        echo json_encode(["status" => "updated"]);
        break;

    case "delete":
        $stmt = $mysqli->prepare("DELETE FROM accounts WHERE id=?");
        $stmt->bind_param("i", $_POST['id']);
        $stmt->execute();
        echo json_encode(["status" => "deleted"]);
        break;

    default:
        echo json_encode(["error" => "Hành động không hợp lệ"]);
        break;
}
?>
