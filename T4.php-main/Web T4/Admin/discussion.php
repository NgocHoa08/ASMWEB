<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thảo luận - LMS Uni</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="discussion.css">
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
                    <a href="Web T4/Login/Login.html">Đăng nhập</a>
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
                <li><a href="discussion.html" class="nav-link"><i class="fas fa-comments"></i> Thảo luận</a></li>
            </ul>
        </div>
    </nav>

    <section class="discussion-section">
        <div class="discussion-container">
            <!-- Bên trái: Bộ lọc chọn giáo viên -->
            <div class="teacher-sidebar">
                <div class="sidebar-header">
                    <h3><i class="fas fa-users"></i> Danh sách giáo viên</h3>
                </div>
                <div class="teacher-list" id="teacherList">
                    <!-- Danh sách giáo viên sẽ được render bằng JS -->
                </div>
            </div>

            <!-- Bên phải: Chat với giáo viên -->
            <div class="chat-main">
                <div class="chat-container">
                    <div class="chat-header" id="chatHeader">
                        <div class="no-teacher-selected">
                            <i class="fas fa-comments"></i>
                            <h3>Chọn giáo viên để bắt đầu chat</h3>
                            <p>Vui lòng chọn một giáo viên từ danh sách bên trái</p>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <!-- Tin nhắn sẽ được render bằng JS -->
                    </div>
                    
                    <div class="chat-input">
                        <input type="text" id="messageInput" placeholder="Nhập tin nhắn của bạn..." disabled>
                        <button id="sendButton" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
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
    <script src="discussion.js"></script>
</body>
</html>