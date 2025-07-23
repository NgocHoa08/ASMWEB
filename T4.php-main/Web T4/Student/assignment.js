document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu bài tập mẫu
    const assignments = [
        {
            id: 1,
            title: "Bài tập 1: Tạo trang web đơn giản",
            course: "001",
            type: "assignment",
            dueDate: "2025-01-15",
            status: "pending",
            desc: "Tạo một trang web HTML đơn giản với CSS cơ bản, bao gồm header, navigation và footer.",
            points: 10
        },
        {
            id: 2,
            title: "Kiểm tra giữa kỳ - Cơ sở dữ liệu",
            course: "002",
            type: "quiz",
            dueDate: "2025-01-20",
            status: "completed",
            desc: "Bài kiểm tra trắc nghiệm về các khái niệm cơ bản của cơ sở dữ liệu quan hệ.",
            points: 20
        },
        {
            id: 3,
            title: "Bài tập 2: Xử lý dữ liệu với Python",
            course: "003",
            type: "assignment",
            dueDate: "2025-01-25",
            status: "pending",
            desc: "Viết chương trình Python để xử lý và phân tích dữ liệu từ file CSV.",
            points: 15
        },
        {
            id: 4,
            title: "Thuyết trình nhóm - Kỹ năng mềm",
            course: "004",
            type: "assignment",
            dueDate: "2025-01-30",
            status: "pending",
            desc: "Thực hiện thuyết trình nhóm về chủ đề giao tiếp hiệu quả trong môi trường công việc.",
            points: 25
        },
        {
            id: 5,
            title: "Bài kiểm tra - Toán rời rạc",
            course: "005",
            type: "quiz",
            dueDate: "2025-02-05",
            status: "pending",
            desc: "Kiểm tra kiến thức về logic toán học, tập hợp và quan hệ.",
            points: 30
        },
        {
            id: 6,
            title: "Dự án Java - Spring Boot",
            course: "006",
            type: "assignment",
            dueDate: "2025-02-10",
            status: "pending",
            desc: "Xây dựng ứng dụng web hoàn chỉnh sử dụng Spring Boot và cơ sở dữ liệu.",
            points: 40
        }
    ];

    let currentCourseFilter = 'all';
    let currentTypeFilter = 'all';

    // Khởi tạo trang
    renderAssignments();
    setupEventListeners();

    function setupEventListeners() {
        // Tìm kiếm môn học
        const searchInput = document.getElementById('courseSearch');
        searchInput.addEventListener('input', function() {
            filterCourses(this.value);
        });

        // Lọc theo môn học
        document.querySelectorAll('.filter-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                currentCourseFilter = this.getAttribute('data-course');
                renderAssignments();
            });
        });

        // Lọc theo loại bài tập
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentTypeFilter = this.getAttribute('data-type');
                renderAssignments();
            });
        });
    }

    function filterCourses(searchTerm) {
        const filterItems = document.querySelectorAll('.filter-item');
        const searchLower = searchTerm.toLowerCase();

        filterItems.forEach(item => {
            const courseText = item.textContent.toLowerCase();
            if (courseText.includes(searchLower)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function renderAssignments() {
        const assignmentList = document.getElementById('assignmentList');
        const filteredAssignments = assignments.filter(assignment => {
            const courseMatch = currentCourseFilter === 'all' || assignment.course === currentCourseFilter;
            const typeMatch = currentTypeFilter === 'all' || assignment.type === currentTypeFilter;
            return courseMatch && typeMatch;
        });

        if (filteredAssignments.length === 0) {
            assignmentList.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Không có bài tập nào phù hợp với bộ lọc.</p>';
            return;
        }

        assignmentList.innerHTML = filteredAssignments.map(assignment => `
            <div class="assignment-item">
                <div class="assignment-header">
                    <h3 class="assignment-title">${assignment.title}</h3>
                    <span class="assignment-type ${assignment.type}">
                        ${assignment.type === 'assignment' ? 'Bài tập' : 'Bài kiểm tra'}
                    </span>
                </div>
                <div class="assignment-meta">
                    <span><i class="fas fa-calendar"></i> Hạn nộp: ${formatDate(assignment.dueDate)}</span>
                    <span><i class="fas fa-star"></i> Điểm: ${assignment.points}</span>
                    <span><i class="fas fa-circle ${assignment.status === 'completed' ? 'text-success' : 'text-warning'}"></i> 
                        ${assignment.status === 'completed' ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                    </span>
                </div>
                <div class="assignment-desc">${assignment.desc}</div>
                <div class="assignment-actions">
                    <button class="action-btn btn-primary">Xem chi tiết</button>
                    ${assignment.status === 'pending' ? '<button class="action-btn btn-secondary">Nộp bài</button>' : ''}
                </div>
            </div>
        `).join('');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }
}); 