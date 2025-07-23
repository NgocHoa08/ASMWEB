<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài tập - LMS Uni</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="assignment.css">
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

    <section class="assignment-section">
        <div class="assignment-container">
            <!-- Bộ lọc môn học bên trái -->
            <div class="filter-sidebar">
                <h3 class="filter-title">Danh sách môn học</h3>
                <div class="search-box">
                    <input type="text" id="courseSearch" placeholder="Tìm kiếm môn học...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="course-filter">
                    <div class="filter-item active" data-course="all">
                        <i class="fas fa-list"></i>
                        Tất cả môn học
                    </div>
                    <div class="filter-item" data-course="001">
                        <i class="fas fa-code"></i>
                        001 - Lập trình Web cơ bản
                    </div>
                    <div class="filter-item" data-course="002">
                        <i class="fas fa-database"></i>
                        002 - Cơ sở dữ liệu
                    </div>
                    <div class="filter-item" data-course="003">
                        <i class="fab fa-python"></i>
                        003 - Python cho AI
                    </div>
                    <div class="filter-item" data-course="004">
                        <i class="fas fa-users"></i>
                        004 - Kỹ năng mềm
                    </div>
                    <div class="filter-item" data-course="005">
                        <i class="fas fa-calculator"></i>
                        005 - Toán rời rạc
                    </div>
                    <div class="filter-item" data-course="006">
                        <i class="fab fa-java"></i>
                        006 - Java nâng cao
                    </div>
                    <div class="filter-item" data-course="007">
                        <i class="fas fa-mobile-alt"></i>
                        007 - Phát triển ứng dụng di động
                    </div>
                    <div class="filter-item" data-course="008">
                        <i class="fas fa-language"></i>
                        008 - Tiếng Anh chuyên ngành
                    </div>
                </div>
            </div>

            <!-- Danh sách bài tập bên phải -->
            <div class="assignment-content">
                <div class="content-header">
                    <h2 class="content-title">Bài tập & Bài kiểm tra</h2>
                    <div class="type-filter">
                        <button class="type-btn active" data-type="all">Tất cả</button>
                        <button class="type-btn" data-type="assignment">Bài tập</button>
                        <button class="type-btn" data-type="quiz">Bài kiểm tra</button>
                    </div>
                    <button class="add-btn" id="addAssignmentBtn"><i class="fas fa-plus"></i> Thêm mới</button>
                </div>
                
                <div class="assignment-list" id="assignmentList">
                    <!-- Các bài tập sẽ được render bằng JS -->
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Thêm Assignment -->
    <div class="modal" id="addAssignmentModal" style="display:none;">
        <div class="modal-content">
            <span class="close" id="closeAddModal">&times;</span>
            <h3>Thêm bài tập / bài kiểm tra</h3>
            <form id="addAssignmentForm">
                <div class="form-group">
                    <label for="addAssignmentTitle">Tiêu đề</label>
                    <input type="text" id="addAssignmentTitle" required>
                </div>
                <div class="form-group">
                    <label for="addAssignmentCourse">Môn học</label>
                    <select id="addAssignmentCourse" required>
                        <option value="001">001 - Lập trình Web cơ bản</option>
                        <option value="002">002 - Cơ sở dữ liệu</option>
                        <option value="003">003 - Python cho AI</option>
                        <option value="004">004 - Kỹ năng mềm</option>
                        <option value="005">005 - Toán rời rạc</option>
                        <option value="006">006 - Java nâng cao</option>
                        <option value="007">007 - Phát triển ứng dụng di động</option>
                        <option value="008">008 - Tiếng Anh chuyên ngành</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="addAssignmentType">Loại</label>
                    <select id="addAssignmentType" required>
                        <option value="assignment">Bài tập</option>
                        <option value="quiz">Bài kiểm tra</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="addAssignmentDueDate">Hạn nộp</label>
                    <input type="date" id="addAssignmentDueDate" required>
                </div>
                <div class="form-group">
                    <label for="addAssignmentDesc">Mô tả</label>
                    <textarea id="addAssignmentDesc" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="addAssignmentStatus">Trạng thái</label>
                    <input type="text" id="addAssignmentStatus" value="Chưa hoàn thành" disabled>
                </div>
                <button type="submit" class="action-btn btn-primary">Lưu</button>
            </form>
        </div>
    </div>

    <!-- Modal Sửa Assignment -->
    <div class="modal" id="editAssignmentModal" style="display:none;">
        <div class="modal-content">
            <span class="close" id="closeEditModal">&times;</span>
            <h3>Sửa bài tập / bài kiểm tra</h3>
            <form id="editAssignmentForm">
                <input type="hidden" id="editAssignmentId">
                <div class="form-group">
                    <label for="editAssignmentTitle">Tiêu đề</label>
                    <input type="text" id="editAssignmentTitle" required>
                </div>
                <div class="form-group">
                    <label for="editAssignmentCourse">Môn học</label>
                    <select id="editAssignmentCourse" required>
                        <option value="001">001 - Lập trình Web cơ bản</option>
                        <option value="002">002 - Cơ sở dữ liệu</option>
                        <option value="003">003 - Python cho AI</option>
                        <option value="004">004 - Kỹ năng mềm</option>
                        <option value="005">005 - Toán rời rạc</option>
                        <option value="006">006 - Java nâng cao</option>
                        <option value="007">007 - Phát triển ứng dụng di động</option>
                        <option value="008">008 - Tiếng Anh chuyên ngành</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editAssignmentType">Loại</label>
                    <select id="editAssignmentType" required>
                        <option value="assignment">Bài tập</option>
                        <option value="quiz">Bài kiểm tra</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editAssignmentDueDate">Hạn nộp</label>
                    <input type="date" id="editAssignmentDueDate" required>
                </div>
                <div class="form-group">
                    <label for="editAssignmentDesc">Mô tả</label>
                    <textarea id="editAssignmentDesc" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="editAssignmentPoints">Chấm điểm</label>
                    <select id="editAssignmentPoints">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editAssignmentStatus">Trạng thái</label>
                    <select id="editAssignmentStatus">
                        <option value="pending">Chưa hoàn thành</option>
                        <option value="completed">Đã hoàn thành</option>
                    </select>
                </div>
                <button type="submit" class="action-btn btn-primary">Lưu</button>
            </form>
        </div>
    </div>

    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 Hệ thống Quản lý Học Tập - Đại học Công nghệ</p>
            <div class="footer-links">
                <a href="#">Về chúng tôi</a>
                <a href="#">Hỗ trợ</a>
                <a href="#">Chính sách bảo mật</a>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
    <script src="assignment.js"></script>
</body>
</html>