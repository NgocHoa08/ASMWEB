<?php
// =============================
// ✅ FILE: Login.php - FULL CODE
// =============================
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header('Content-Type: application/json');

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';

    $conn = new mysqli("localhost", "root", "", "lms_db");
    if ($conn->connect_error) {
        echo json_encode(['error' => 'Kết nối CSDL thất bại: ' . $conn->connect_error]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, fullname, password, role_id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['fullname'] = $user['fullname'];
        $_SESSION['role_id'] = $user['role_id'];

        $redirect = match ((int)$user['role_id']) {
            1 => '../Admin/my-courses.php',
            2 => '../Teacher/my-courses.php',
            3 => '../Student/my-courses.php',
            4 => '../Parent/my-courses.php',
            default => 'index.php'
        };



        echo json_encode(['success' => true, 'redirect' => $redirect]);
    } else {
        echo json_encode(['error' => 'Đăng nhập thất bại! Kiểm tra email hoặc mật khẩu.']);
    }
    $stmt->close();
    $conn->close();
    exit;
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập - Hệ thống Quản lý Học tập</title>
    <link rel="stylesheet" href="csslogin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-left">
                <div class="login-left-content">
                    <a class="login-logo" href="index.php">
                        <span class="logo-icon"><i class="fas fa-graduation-cap"></i></span>
                        <h1>LMS Uni</h1>
                    </a>
                    <div class="login-welcome">
                        <h2>Chào mừng trở lại!</h2>
                        <p>Đăng nhập vào hệ thống quản lý học tập để tiếp tục hành trình học tập của bạn.</p>
                    </div>
                    <ul class="login-features">
                        <li><i class="fas fa-book-open"></i><span>Truy cập khóa học và tài liệu</span></li>
                        <li><i class="fas fa-chart-line"></i><span>Theo dõi tiến độ học tập</span></li>
                        <li><i class="fas fa-users"></i><span>Tương tác với giảng viên</span></li>
                        <li><i class="fas fa-calendar-check"></i><span>Quản lý lịch học và bài tập</span></li>
                    </ul>
                </div>
            </div>
            <div class="login-right">
                <div class="login-form-header">
                    <h2>Đăng nhập</h2>
                    <p>Nhập thông tin đăng nhập của bạn</p>
                </div>
                <form class="login-form" id="loginForm" method="POST">
                    <div class="form-group">
                        <label for="email">Email sinh viên</label>
                        <input type="email" id="email" name="email" placeholder="Nhập email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <div class="password-field">
                            <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                            <button type="button" class="password-toggle" onclick="togglePassword()">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="remember" name="remember">
                            <label for="remember">Ghi nhớ đăng nhập</label>
                        </div>
                        <a href="#" class="forgot-password">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" class="login-btn">
                        <i class="fas fa-sign-in-alt"></i> Đăng nhập
                    </button>
                    <div class="register-link">
                        <span>Bạn chưa có tài khoản?</span>
                        <a href="register.php">Đăng ký ngay</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="jslogin.js"></script>
</body>
</html>
