<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Khóa học của tôi - LMS Uni</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="my-courses.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <i class="fas fa-graduation-cap"></i>
            <h1>LMS Uni</h1>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Tìm kiếm khóa học, tài liệu...">
            <button><i class="fas fa-search"></i></button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <div class="user-profile user-menu-container">
                <i class="fas fa-user"></i>
                <div class="user-dropdown-menu">
                    <a href="../Login/Login.html">Đăng nhập</a>
                    <a href="#">Đăng ký</a>
                </div>
            </div>
            <button class="settings-btn settings-menu-container">
                <i class="fas fa-cog"></i>
                <div class="settings-dropdown-menu">
                    <a href="#">Thông tin</a>
                    <a href="#">Liên hệ</a>
                </div>
            </button>
        </div>
    </header>

    <nav class="horizontal-nav">
        <div class="nav-container">
            <ul class="nav-menu">
                <li><a href="my-courses.html" class="nav-link active"><i class="fas fa-calendar-alt"></i> Trang Chủ </a></li>
            </ul>
        </div>
    </nav>

    <section class="courses-section">
        <div class="courses-grid">
            <!-- Các card sẽ được render bằng JS -->
        </div>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 Hệ thống Quản lý Học tập - Đại học Công nghệ</p>
            <div class="footer-links">
                <a href="#">Về chúng tôi</a>
                <a href="#">Hỗ trợ</a>
                <a href="#">Chính sách bảo mật</a>
            </div>
        </div>
    </footer>

    <script src="my-courses.js"></script>
</body>
</html>