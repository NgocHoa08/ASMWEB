<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lịch học - LMS Uni</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="schedule.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <i class="fas fa-graduation-cap"></i>
            <h1>LMS Uni</h1>
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
               
                <li><a href="schedule.html" class="nav-link"><i class="fas fa-book"></i>Trang Chủ </a></li>
                <li><a href="my-courses.html" class="nav-link active"><i class="fas fa-calendar-alt"></i> Khóa học của tôi</a></li>
                <li><a href="assignment.html" class="nav-link"><i class="fas fa-tasks"></i> Bài tập</a></li>
                <li><a href="discussion.html" class="nav-link"><i class="fas fa-comments"></i> Thảo luận</a></li>
            </ul>
        </div>
    </nav>

    <section class="schedule-section">
        <div class="schedule-container">
            <!-- Phần thông báo -->
            <div class="announcement-section">
                <h3 class="announcement-title">
                    <i class="fas fa-bullhorn"></i> Thông báo quan trọng
                </h3>
                <div class="announcement-list" id="announcementList">
                    <!-- Thông báo sẽ được render bằng JS -->
                </div>
            </div>

            <h2 class="schedule-title">Lịch học tuần này</h2>
            <div class="schedule-table">
                <div class="schedule-header">
                    <div class="time-column">Thời gian</div>
                    <div class="day-column">Thứ 2</div>
                    <div class="day-column">Thứ 3</div>
                    <div class="day-column">Thứ 4</div>
                    <div class="day-column">Thứ 5</div>
                    <div class="day-column">Thứ 6</div>
                    <div class="day-column">Thứ 7</div>
                </div>
                <div class="schedule-body">
                    <!-- Lịch học sẽ được render bằng JS -->
                </div>
            </div>
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

    <script src="script.js"></script>
    <script src="schedule.js"></script>
</body>
</html>