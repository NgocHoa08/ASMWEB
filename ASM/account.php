<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

include 'config.php';

// Lấy thông tin vai trò và họ tên người dùng
$user_id = $_SESSION['user_id'];
$sql = "SELECT role, full_name, email, phone FROM users WHERE id = ?";
$stmt = mysqli_prepare($connect, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result) ?? ['role' => 'user', 'full_name' => 'Người dùng', 'email' => '', 'phone' => ''];
$_SESSION['role'] = $user['role'];
$_SESSION['full_name'] = $user['full_name'];
mysqli_stmt_close($stmt);

$profile_msg = '';
$payment_msg = '';

// Cập nhật thông tin hồ sơ
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update_profile'])) {
    $full_name = mysqli_real_escape_string($connect, $_POST['full_name']);
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $phone = mysqli_real_escape_string($connect, $_POST['phone']);
    $password = !empty($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : $user['password'];

    if (empty($full_name) || empty($email)) {
        $profile_msg = "<div class='alert alert-danger'>Vui lòng nhập đầy đủ họ tên và email!</div>";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $profile_msg = "<div class='alert alert-danger'>Email không hợp lệ!</div>";
    } else {
        $sql = "UPDATE users SET full_name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
        $stmt = mysqli_prepare($connect, $sql);
        mysqli_stmt_bind_param($stmt, "ssssi", $full_name, $email, $phone, $password, $user_id);
        if (mysqli_stmt_execute($stmt)) {
            $profile_msg = "<div class='alert alert-success'>Cập nhật hồ sơ thành công!</div>";
            $_SESSION['full_name'] = $full_name; // Cập nhật session
            $user['full_name'] = $full_name;
            $user['email'] = $email;
            $user['phone'] = $phone;
        } else {
            $profile_msg = "<div class='alert alert-danger'>Cập nhật hồ sơ thất bại: " . mysqli_error($connect) . "</div>";
        }
        mysqli_stmt_close($stmt);
    }
}

// Cập nhật thông tin thanh toán
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update_payment'])) {
    $card_number = mysqli_real_escape_string($connect, $_POST['card_number']);
    $expiry_date = mysqli_real_escape_string($connect, $_POST['expiry_date']);
    $cvv = mysqli_real_escape_string($connect, $_POST['cvv']);

    if (empty($card_number) || empty($expiry_date) || empty($cvv)) {
        $payment_msg = "<div class='alert alert-danger'>Vui lòng nhập đầy đủ thông tin thanh toán!</div>";
    } elseif (!preg_match("/^\d{16}$/", $card_number)) {
        $payment_msg = "<div class='alert alert-danger'>Số thẻ không hợp lệ (phải là 16 chữ số)!</div>";
    } elseif (!preg_match("/^(0[1-9]|1[0-2])\/\d{2}$/", $expiry_date)) {
        $payment_msg = "<div class='alert alert-danger'>Ngày hết hạn không hợp lệ (MM/YY)!</div>";
    } elseif (!preg_match("/^\d{3,4}$/", $cvv)) {
        $payment_msg = "<div class='alert alert-danger'>CVV không hợp lệ (3-4 chữ số)!</div>";
    } else {
        // Kiểm tra kết nối và bảng
        $sql_check = "SHOW TABLES LIKE 'payment_methods'";
        $result_check = mysqli_query($connect, $sql_check);
        if (mysqli_num_rows($result_check) == 0) {
            $payment_msg = "<div class='alert alert-danger'>Bảng payment_methods không tồn tại. Vui lòng tạo bảng!</div>";
        } else {
            // Kiểm tra xem đã có phương thức thanh toán chưa
            $sql = "SELECT id FROM payment_methods WHERE user_id = ? LIMIT 1";
            $stmt = mysqli_prepare($connect, $sql);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $user_id);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $payment_exists = mysqli_fetch_assoc($result);

                if ($payment_exists) {
                    $sql = "UPDATE payment_methods SET card_number = ?, expiry_date = ?, cvv = ?, updated_at = NOW() WHERE user_id = ?";
                    $stmt = mysqli_prepare($connect, $sql);
                    mysqli_stmt_bind_param($stmt, "sssi", $card_number, $expiry_date, $cvv, $user_id);
                } else {
                    $sql = "INSERT INTO payment_methods (user_id, card_number, expiry_date, cvv, created_at) VALUES (?, ?, ?, ?, NOW())";
                    $stmt = mysqli_prepare($connect, $sql);
                    mysqli_stmt_bind_param($stmt, "isss", $user_id, $card_number, $expiry_date, $cvv);
                }

                if ($stmt && mysqli_stmt_execute($stmt)) {
                    $payment_msg = "<div class='alert alert-success'>Cập nhật thông tin thanh toán thành công!</div>";
                } else {
                    $payment_msg = "<div class='alert alert-danger'>Cập nhật thông tin thanh toán thất bại: " . mysqli_error($connect) . "</div>";
                }
                mysqli_stmt_close($stmt);
            } else {
                $payment_msg = "<div class='alert alert-danger'>Lỗi chuẩn bị truy vấn: " . mysqli_error($connect) . "</div>";
            }
        }
    }
}

// Lấy lịch sử đơn hàng
$sql = "SELECT o.id, o.total_amount, o.status, o.shipping_address, o.created_at 
        FROM orders o 
        WHERE o.user_id = ? 
        ORDER BY o.created_at DESC";
$stmt = mysqli_prepare($connect, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$orders = mysqli_fetch_all($result, MYSQLI_ASSOC);
mysqli_stmt_close($stmt);
mysqli_close($connect);
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tài Khoản - BTEC Sweet Shop</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #4A90E2;
            --secondary-color: #4B5563;
            --accent-color: #FEF3C7;
            --background-color: #FFF7ED;
            --hover-color: #3B82F6;
        }
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c') no-repeat center center fixed;
            background-size: cover;
            min-height: 100vh;
        }
        .wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: rgba(255, 247, 237, 0.95);
        }
        .header {
            background: linear-gradient(90deg, #ffffff, var(--accent-color));
            padding: 12px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .logo img {
            height: 50px;
            margin-left: 20px;
            transition: transform 0.3s ease;
        }
        .logo img:hover {
            transform: scale(1.1);
        }
        .form-search {
            max-width: 450px;
            flex-grow: 1;
            margin: 0 20px;
        }
        .form-search input[type="text"] {
            border-radius: 20px 0 0 20px;
            padding: 10px 15px;
            font-size: 14px;
            border: 1px solid #d1d5db;
            transition: border-color 0.3s ease;
        }
        .form-search input[type="text"]:focus {
            border-color: var(--primary-color);
            outline: none;
        }
        .form-search button {
            border-radius: 0 20px 20px 0;
            padding: 10px 15px;
            background-color: var(--primary-color);
            border: none;
            color: white;
            transition: background-color 0.3s ease;
        }
        .form-search button:hover {
            background-color: var(--hover-color);
        }
        .icon-cart img, .icon-user img {
            height: 30px;
            width: 30px;
            margin: 0 12px;
            transition: transform 0.3s ease;
        }
        .icon-cart img:hover, .icon-user img:hover {
            transform: scale(1.2);
        }
        .user-name {
            font-size: 14px;
            font-weight: 500;
            color: var(--secondary-color);
            margin-left: 8px;
        }
        .navbar {
            background-color: var(--primary-color);
            padding: 8px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        .navbar-nav .nav-link {
            color: #fff !important;
            font-size: 15px;
            font-weight: 600;
            padding: 10px 18px;
            transition: background-color 0.3s ease, color 0.3s ease;
            border-radius: 6px;
            margin: 0 5px;
        }
        .navbar-nav .nav-link:hover, .navbar-nav .nav-link.active {
            background-color: var(--hover-color);
            color: #fff !important;
        }
        .dropdown-menu {
            z-index: 1001;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background-color: #fff;
        }
        .dropdown-menu .dropdown-item {
            font-size: 14px;
            padding: 8px 15px;
            transition: background-color 0.3s ease;
        }
        .dropdown-menu .dropdown-item:hover {
            background-color: var(--accent-color);
            color: var(--primary-color);
        }
        .content {
            flex: 1;
            padding: 25px 0;
        }
        .account-section {
            background-color: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .account-section h3 {
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        .order-table img {
            max-width: 50px;
            height: auto;
            border-radius: 4px;
        }
        .payment-input {
            font-size: 14px;
        }
        .payment-input::-webkit-input-placeholder {
            color: #999;
        }
        .footer {
            background: linear-gradient(90deg, var(--primary-color), var(--hover-color));
            color: #fff;
            padding: 50px 0;
        }
        .footer a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .footer a:hover {
            color: var(--accent-color);
        }
        .footer .social-icons a {
            font-size: 22px;
            margin: 0 12px;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <header class="header">
            <div class="container-fluid d-flex align-items-center justify-content-between">
                <div class="logo">
                    <a href="banbanh.php"><img src="https://cdn.haitrieu.com/wp-content/uploads/2023/02/Logo-Truong-cao-dang-Quoc-te-BTEC-FPT.png" alt="BTEC Sweet Shop"></a>
                </div>
                <form class="form-search d-flex" action="product.php" method="GET" role="search">
                    <input type="text" name="search" placeholder="Tìm kiếm bánh kẹo..." class="form-control" aria-label="Tìm kiếm sản phẩm">
                    <button type="submit" class="btn" aria-label="Tìm kiếm"><i class="fas fa-search"></i></button>
                </form>
                <div class="icon-cart">
                    <a href="cart.php" aria-label="Giỏ hàng"><img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Cart"></a>
                </div>
                <div class="icon-user dropdown d-flex align-items-center">
                    <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Tài khoản" aria-haspopup="true">
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User">
                        <span class="user-name"><?php echo htmlspecialchars($_SESSION['full_name']); ?></span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="account.php">Hồ Sơ</a></li>
                        <li><a class="dropdown-item" href="account.php#orders">Đơn Hàng</a></li>
                        <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
                            <li><a class="dropdown-item" href="admin.php">Quản Trị</a></li>
                            <li><a class="dropdown-item" href="banbanh.php">Thêm Sản Phẩm</a></li>
                        <?php endif; ?>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="logout.php">Đăng Xuất</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <nav class="navbar navbar-expand-md sticky-top">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"><a class="nav-link" href="product.php">Tất Cả Sản Phẩm</a></li>
                        <li class="nav-item"><a class="nav-link active" href="account.php" aria-current="page">Tài Khoản</a></li>
                        <li class="nav-item"><a class="nav-link" href="cart.php">Giỏ Hàng</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact.php">Liên Hệ</a></li>
                        <!-- <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
                            <li class="nav-item"><a class="nav-link" href="banbanh.php">Thêm Sản Phẩm</a></li>
                        <?php endif; ?> -->
                    </ul>
                </div>
            </div>
        </nav>
        <div class="content container-fluid animate__fadeIn">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-12">
                    <div class="account-section">
                        <h3>Hồ Sơ</h3>
                        <?php echo $profile_msg; ?>
                        <form action="" method="POST" class="row g-3">
                            <input type="hidden" name="update_profile" value="1">
                            <div class="col-md-6">
                                <label for="full_name" class="form-label">Họ và Tên</label>
                                <input type="text" class="form-control" id="full_name" name="full_name" value="<?php echo htmlspecialchars($user['full_name']); ?>" required>
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
                            </div>
                            <div class="col-md-6">
                                <label for="phone" class="form-label">Số Điện Thoại</label>
                                <input type="tel" class="form-control" id="phone" name="phone" value="<?php echo htmlspecialchars($user['phone']); ?>">
                            </div>
                            <div class="col-md-6">
                                <label for="password" class="form-label">Mật Khẩu Mới (để trống nếu không đổi)</label>
                                <input type="password" class="form-control" id="password" name="password">
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Cập Nhật Hồ Sơ</button>
                            </div>
                        </form>
                    </div>
                    <div class="account-section mt-5" id="orders">
                        <h3>Lịch Sử Đơn Hàng</h3>
                        <?php if (empty($orders)): ?>
                            <p class="text-center">Bạn chưa có đơn hàng nào.</p>
                        <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-bordered order-table">
                                    <thead>
                                        <tr>
                                            <th>Mã Đơn</th>
                                            <th>Tổng Tiền</th>
                                            <th>Trạng Thái</th>
                                            <th>Địa Chỉ Giao Hàng</th>
                                            <th>Ngày Đặt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($orders as $order): ?>
                                            <tr>
                                                <td>#<?php echo htmlspecialchars($order['id']); ?></td>
                                                <td><?php echo number_format($order['total_amount'], 0, ',', '.'); ?>đ</td>
                                                <td><?php echo htmlspecialchars($order['status']); ?></td>
                                                <td><?php echo htmlspecialchars($order['shipping_address']); ?></td>
                                                <td><?php echo htmlspecialchars($order['created_at']); ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="account-section mt-5">
                        <h3>Thông Tin Thanh Toán</h3>
                        <?php
                        // Lấy thông tin thanh toán hiện tại (nếu có)
                        $sql = "SELECT card_number, expiry_date, cvv FROM payment_methods WHERE user_id = ? LIMIT 1";
                        $stmt = mysqli_prepare($connect, $sql);
                        if ($stmt) {
                            mysqli_stmt_bind_param($stmt, "i", $user_id);
                            mysqli_stmt_execute($stmt);
                            $result = mysqli_stmt_get_result($stmt);
                            $payment = mysqli_fetch_assoc($result) ?? ['card_number' => '', 'expiry_date' => '', 'cvv' => ''];
                            mysqli_stmt_close($stmt);
                        } else {
                            $payment = ['card_number' => '', 'expiry_date' => '', 'cvv' => ''];
                            $payment_msg = "<div class='alert alert-danger'>Lỗi chuẩn bị truy vấn thanh toán: " . mysqli_error($connect) . "</div>";
                        }
                        echo $payment_msg;
                        ?>
                        <form action="" method="POST" class="row g-3">
                            <input type="hidden" name="update_payment" value="1">
                            <div class="col-md-6">
                                <label for="card_number" class="form-label">Số Thẻ (16 chữ số)</label>
                                <input type="text" class="form-control payment-input" id="card_number" name="card_number" value="<?php echo htmlspecialchars($payment['card_number']); ?>" placeholder="1234567890123456" required>
                            </div>
                            <div class="col-md-3">
                                <label for="expiry_date" class="form-label">Ngày Hết Hạn (MM/YY)</label>
                                <input type="text" class="form-control payment-input" id="expiry_date" name="expiry_date" value="<?php echo htmlspecialchars($payment['expiry_date']); ?>" placeholder="12/25" required>
                            </div>
                            <div class="col-md-3">
                                <label for="cvv" class="form-label">CVV (3-4 chữ số)</label>
                                <input type="text" class="form-control payment-input" id="cvv" name="cvv" value="<?php echo htmlspecialchars($payment['cvv']); ?>" placeholder="123" required>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Lưu Thông Tin Thanh Toán</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <h5>Giới Thiệu</h5>
                        <p>BTEC Sweet Shop mang đến những loại bánh kẹo ngon, chất lượng cao, lan tỏa niềm vui ngọt ngào cho mọi nhà.</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5>Liên Hệ</h5>
                        <ul class="list-unstyled">
                            <li><i class="fas fa-map-marker-alt me-2"></i>406 xuân phương</li>
                            <li><i class="fas fa-phone me-2"></i>0899133869</li>
                            <li><i class="fas fa-envelope me-2"></i>hoa2282005hhh@gmail.com</li>
                        </ul>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5>Đăng Ký Bản Tin</h5>
                        <form class="newsletter-form d-flex">
                            <input type="email" placeholder="Nhập email của bạn..." class="form-control" aria-label="Email đăng ký bản tin" required>
                            <button type="submit" class="btn">Đăng Ký</button>
                        </form>
                        <h5 class="mt-4">Theo Dõi Chúng Tôi</h5>
                        <div class="social-icons">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <p>© 2025 BTEC Sweet Shop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>