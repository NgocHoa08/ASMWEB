<?php
header('Content-Type: application/json');
session_start();

if (isset($_SESSION['user_id'])) {
    require 'config.php';
    $stmt = $pdo->prepare("SELECT id, full_name, role FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Không tìm thấy người dùng']);
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Chưa đăng nhập']);
}
?>
