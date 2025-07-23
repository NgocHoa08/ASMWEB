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
                <li><a href="discussion.html" class="nav-link"><i class="fas fa-comments"></i> Thảo luận</a></li>
            </ul>
        </div>
    </nav>

    <section class="schedule-section">
        <div class="schedule-container">
            <!-- Phần thông báo -->
            <div class="announcement-section">
                <div class="announcement-header">
                    <h3 class="announcement-title">
                        <i class="fas fa-bullhorn"></i> Quản lý thông báo
                    </h3>
                    <button class="add-announcement-btn" onclick="openAddModal()">
                        <i class="fas fa-plus"></i> Thêm thông báo
                    </button>
                </div>
                <div class="announcement-list" id="announcementList">
                    <!-- Thông báo sẽ được render bằng JS -->
                </div>
            </div>

            <!-- Modal thêm/sửa thông báo -->
            <div id="announcementModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle">Thêm thông báo mới</h3>
                        <button class="close-modal" onclick="closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="announcementForm" onsubmit="saveAnnouncement(event)">
                        <input type="hidden" id="announcementId" value="">
                        <div class="form-group">
                            <label for="announcementTitle">Tiêu đề thông báo:</label>
                            <input type="text" id="announcementTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="announcementContent">Nội dung:</label>
                            <textarea id="announcementContent" rows="4" required></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="announcementType">Loại thông báo:</label>
                                <select id="announcementType" required>
                                    <option value="info">Thông tin</option>
                                    <option value="warning">Cảnh báo</option>
                                    <option value="success">Thành công</option>
                                    <option value="error">Lỗi</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="announcementPriority">Mức độ ưu tiên:</label>
                                <select id="announcementPriority" required>
                                    <option value="low">Thấp</option>
                                    <option value="medium">Trung bình</option>
                                    <option value="high">Cao</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="closeModal()">Hủy</button>
                            <button type="submit" class="btn-save">Lưu thông báo</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="schedule-header-section">
                <h2 class="schedule-title">Lịch học tuần này</h2>
                <button class="add-schedule-btn" onclick="openScheduleModal()">
                    <i class="fas fa-plus"></i> Thêm lịch học
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
            <!-- Danh sách yêu cầu đã gửi -->
            <div class="request-list-section" style="margin: 24px 0; background: #f9fafb; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 32px 0; text-align: center;">
                <div style="display: flex; align-items: center; gap: 8px; justify-content: flex-start; margin-left: 32px;">
                    <i class="fas fa-list-alt" style="font-size: 22px; color: #444;"></i>
                    <span style="font-size: 20px; font-weight: 600; color: #222;">Danh sách yêu cầu</span>
                </div>
                <div style="margin-top: 32px; color: #aaa; font-size: 20px; font-style: italic;">Chưa có yêu cầu nào.</div>
            </div>

            <!-- Modal thêm/sửa lịch học -->
            <div id="scheduleModal" class="modal">
                <div class="modal-content schedule-modal-content">
                    <div class="modal-header">
                        <h3 id="scheduleModalTitle">Thêm lịch học mới</h3>
                        <button class="close-modal" onclick="closeScheduleModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="scheduleForm" onsubmit="saveSchedule(event)">
                        <input type="hidden" id="scheduleId" value="">
                        <input type="hidden" id="scheduleRow" value="">
                        <input type="hidden" id="scheduleCol" value="">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="scheduleTimeSlot">Thời gian:</label>
                                <select id="scheduleTimeSlot" required>
                                    <option value="">Chọn thời gian</option>
                                    <option value="0">7:00 - 8:30</option>
                                    <option value="1">8:45 - 10:15</option>
                                    <option value="2">10:30 - 12:00</option>
                                    <option value="3">13:30 - 15:00</option>
                                    <option value="4">15:00 - 17:00</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="scheduleDay">Thứ:</label>
                                <select id="scheduleDay" required>
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
                            <label for="scheduleCourse">Mã môn học:</label>
                            <input type="text" id="scheduleCourse" placeholder="VD: 001" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="scheduleTitle">Tên môn học:</label>
                            <input type="text" id="scheduleTitle" placeholder="VD: Lập trình Web" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="scheduleRoom">Phòng học:</label>
                                <input type="text" id="scheduleRoom" placeholder="VD: A101" required>
                            </div>
                            <div class="form-group">
                                <label for="scheduleInstructor">Giảng viên:</label>
                                <input type="text" id="scheduleInstructor" placeholder="VD: Nguyễn Văn A" required>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="closeScheduleModal()">Hủy</button>
                            <button type="submit" class="btn-save">Lưu lịch học</button>
                        </div>
                    </form>
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