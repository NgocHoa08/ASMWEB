<?php
// =============================
// ✅ FILE: register.php - FULL CODE
// =============================
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header('Content-Type: application/json');

    $fullname = filter_input(INPUT_POST, 'fullname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    if (!$fullname || !$email || !$password || !$confirmPassword) {
        echo json_encode(['error' => 'Vui lòng điền đầy đủ thông tin.']);
        exit;
    }

    if ($password !== $confirmPassword) {
        echo json_encode(['error' => 'Mật khẩu không khớp!']);
        exit;
    }

    $hashPassword = password_hash($password, PASSWORD_BCRYPT);

    $conn = new mysqli("localhost", "root", "", "lms_db");
    if ($conn->connect_error) {
        echo json_encode(['error' => 'Kết nối CSDL thất bại: ' . $conn->connect_error]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO users (fullname, email, password, role_id) VALUES (?, ?, ?, 3)");
    $stmt->bind_param("sss", $fullname, $email, $hashPassword);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đăng ký thành công! Hãy đăng nhập.', 'redirect' => 'Login.php']);
    } else {
        echo json_encode(['error' => 'Đăng ký thất bại! Email đã tồn tại.']);
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
    <title>Đăng ký - Hệ thống Quản lý Học tập</title>
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
                        <h2>Chào mừng bạn!</h2>
                        <p>Đăng ký tài khoản để bắt đầu hành trình học tập cùng chúng tôi.</p>
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
                    <h2>Đăng ký</h2>
                    <p>Nhập thông tin để tạo tài khoản mới</p>
                </div>
                <form class="login-form" id="registerForm" method="POST">
                    <div class="form-group">
                        <label for="fullname">Họ tên</label>
                        <input type="text" id="fullname" name="fullname" placeholder="Nhập họ tên" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
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
                    <div class="form-group">
                        <label for="confirmPassword">Xác nhận mật khẩu</label>
                        <div class="password-field">
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Nhập lại mật khẩu" required>
                            <button type="button" class="password-toggle" onclick="toggleConfirmPassword()">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="login-btn">
                        <i class="fas fa-user-plus"></i> Đăng ký
                    </button>
                    <div class="register-link">
                        <span>Đã có tài khoản?</span>
                        <a href="Login.php">Đăng nhập ngay</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="jsregister.js"></script>
</body>
</html>
