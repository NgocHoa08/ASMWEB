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
            <div class="schedule-header-section">
                <h2 class="schedule-title">Lịch học tuần này</h2>
                <button class="request-change-btn" onclick="openRequestModal()">
                    <i class="fas fa-paper-plane"></i> Gửi yêu cầu thay đổi lịch học
                </button>
            </div>
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

            <!-- Modal gửi yêu cầu thay đổi lịch học -->
            <div id="requestModal" class="modal">
                <div class="modal-content request-modal-content">
                    <div class="modal-header">
                        <h3>Gửi yêu cầu thay đổi lịch học</h3>
                        <button class="close-modal" onclick="closeRequestModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="requestForm" onsubmit="submitRequest(event)">
                        <div class="form-group">
                            <label for="requestType">Loại yêu cầu:</label>
                            <select id="requestType" required>
                                <option value="">Chọn loại yêu cầu</option>
                                <option value="add">Thêm lịch học</option>
                                <option value="edit">Sửa lịch học</option>
                                <option value="delete">Xóa lịch học</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestTimeSlot">Thời gian:</label>
                                <select id="requestTimeSlot" required>
                                    <option value="">Chọn thời gian</option>
                                    <option value="0">7:00 - 8:30</option>
                                    <option value="1">8:45 - 10:15</option>
                                    <option value="2">10:30 - 12:00</option>
                                    <option value="3">13:30 - 15:00</option>
                                    <option value="4">15:00 - 17:00</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="requestDay">Thứ:</label>
                                <select id="requestDay" required>
                                    <option value="">Chọn thứ</option>
                                    <option value="0">Thứ 2</option>
                                    <option value="1">Thứ 3</option>
                                    <option value="2">Thứ 4</option>
                                    <option value="3">Thứ 5</option>
                                    <option value="4">Thứ 6</option>
                                    <option value="5">Thứ 7</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="requestCourse">Mã môn học:</label>
                            <input type="text" id="requestCourse" placeholder="VD: 001" required>
                        </div>
                        <div class="form-group">
                            <label for="requestTitle">Tên môn học:</label>
                            <input type="text" id="requestTitle" placeholder="VD: Lập trình Web" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestRoom">Phòng học:</label>
                                <input type="text" id="requestRoom" placeholder="VD: A101" required>
                            </div>
                            <div class="form-group">
                                <label for="requestInstructor">Giảng viên:</label>
                                <input type="text" id="requestInstructor" placeholder="VD: Nguyễn Văn A" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="requestReason">Lý do (bắt buộc):</label>
                            <textarea id="requestReason" rows="3" placeholder="Nhập lý do thay đổi..." required></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="closeRequestModal()">Hủy</button>
                            <button type="submit" class="btn-save">Gửi yêu cầu</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Danh sách yêu cầu đã gửi -->
            <div class="request-list-section">
                <h3 class="request-list-title"><i class="fas fa-list"></i> Danh sách yêu cầu đã gửi</h3>
                <div id="requestList" class="request-list">
                    <!-- Danh sách yêu cầu sẽ được render bằng JS -->
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
</html>
