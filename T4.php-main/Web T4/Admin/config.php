
<?php
header('Content-Type: application/json');
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lấy danh sách người dùng (dành cho admin)
        $stmt = $pdo->query("SELECT id, username, email, full_name, role FROM users");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case 'PUT':
        // Cập nhật vai trò người dùng (dành cho admin)
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
        $stmt->execute([$data['role'], $data['id']]);
        echo json_encode(['message' => 'Cập nhật vai trò thành công']);
        break;
}
?>