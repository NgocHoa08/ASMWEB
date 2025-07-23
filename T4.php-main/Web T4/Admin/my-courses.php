
<?php
// Khởi động session để kiểm tra đăng nhập nếu cần
session_start();
?>
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
                    <a href="../Login/Login.php">Đăng nhập</a>
                    <a href="#">Đăng ký</a>
                </div>
            </div>
            <button class="settings-btn settings-menu-container">
                <i class="fas fa-cog"></i>
                <div class="settings-dropdown-menu">
                    <a href="#">Thông tin</a>
                    <a href="#">Liên hệ</a>
                    <a href="#" id="manage-accounts" style="display: none;">Quản lý tài khoản</a>
                </div>
            </button>
        </div>
    </header>

    <nav class="horizontal-nav">
        <div class="nav-container">
            <ul class="nav-menu">
                <li><a href="schedule.php" class="nav-link"><i class="fas fa-book"></i> Trang Chủ </a></li>
                <li><a href="my-courses.php" class="nav-link active"><i class="fas fa-calendar-alt"></i> Khóa học của tôi</a></li>
                <li><a href="discussion.php" class="nav-link"><i class="fas fa-comments"></i> Thảo luận</a></li>
            </ul>
        </div>
    </nav>

    <section class="courses-section">
        <div class="courses-header">
            <h2 class="courses-title">Quản lý khóa học</h2>
            <button class="add-course-btn" onclick="openCourseModal()">
                <i class="fas fa-plus"></i> Thêm khóa học
            </button>
        </div>
        <div class="courses-grid">
            <!-- Các card sẽ được render bằng JS -->
        </div>
    </section>

    <!-- Modal thêm/sửa khóa học -->
    <div id="courseModal" class="modal">
        <div class="modal-content course-modal-content">
            <div class="modal-header">
                <h3 id="courseModalTitle">Thêm khóa học mới</h3>
                <button class="close-modal" onclick="closeCourseModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="courseForm" onsubmit="saveCourse(event)">
                <input type="hidden" id="courseId" value="">
                <div class="form-row">
                    <div class="form-group">
                        <label for="courseCode">Mã khóa học:</label>
                        <input type="text" id="courseCode" placeholder="VD: 001" required>
                    </div>
                    <div class="form-group">
                        <label for="courseTitle">Tên khóa học:</label>
                        <input type="text" id="courseTitle" placeholder="VD: Lập trình Web cơ bản" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="courseDesc">Mô tả khóa học:</label>
                    <textarea id="courseDesc" rows="4" placeholder="Mô tả chi tiết về khóa học..." required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="courseInstructor">Giảng viên:</label>
                        <select id="courseInstructor" required>
                            <!-- Options sẽ được render bằng JS -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="courseImage">URL hình ảnh:</label>
                        <input type="url" id="courseImage" placeholder="VD: images/web.jpg" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="closeCourseModal()">Hủy</button>
                    <button type="submit" class="btn-save">Lưu khóa học</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal quản lý tài khoản -->
    <div id="accountModal" class="modal">
        <div class="modal-content account-modal-content">
            <div class="modal-header">
                <h3>Quản lý tài khoản</h3>
                <button class="close-modal" onclick="closeAccountModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="account-list">
                <!-- Danh sách tài khoản sẽ được render bằng JS -->
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="footer-content">
            <p>© 2025 Hệ thống Quản lý Học tập - Đại học Công nghệ</p>
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
