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

    // Modal và form cho Thêm mới
    const addModal = document.getElementById('addAssignmentModal');
    const closeAddModalBtn = document.getElementById('closeAddModal');
    const addBtn = document.getElementById('addAssignmentBtn');
    const addForm = document.getElementById('addAssignmentForm');
    const addAssignmentTitleInput = document.getElementById('addAssignmentTitle');
    const addAssignmentCourseInput = document.getElementById('addAssignmentCourse');
    const addAssignmentTypeInput = document.getElementById('addAssignmentType');
    const addAssignmentDueDateInput = document.getElementById('addAssignmentDueDate');
    const addAssignmentDescInput = document.getElementById('addAssignmentDesc');

    // Modal và form cho Sửa
    const editModal = document.getElementById('editAssignmentModal');
    const closeEditModalBtn = document.getElementById('closeEditModal');
    const editForm = document.getElementById('editAssignmentForm');
    const editAssignmentIdInput = document.getElementById('editAssignmentId');
    const editAssignmentTitleInput = document.getElementById('editAssignmentTitle');
    const editAssignmentCourseInput = document.getElementById('editAssignmentCourse');
    const editAssignmentTypeInput = document.getElementById('editAssignmentType');
    const editAssignmentDueDateInput = document.getElementById('editAssignmentDueDate');
    const editAssignmentDescInput = document.getElementById('editAssignmentDesc');
    const editAssignmentPointsInput = document.getElementById('editAssignmentPoints');
    const editAssignmentStatusInput = document.getElementById('editAssignmentStatus');

    // Mở modal Thêm mới
    addBtn.addEventListener('click', function() {
        addModal.style.display = 'block';
        addForm.reset();
    });
    closeAddModalBtn.addEventListener('click', function() {
        addModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
        if (e.target === addModal) addModal.style.display = 'none';
        if (e.target === editModal) editModal.style.display = 'none';
    });

    // Submit Thêm mới
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newAssignment = {
            id: Date.now(),
            title: addAssignmentTitleInput.value,
            course: addAssignmentCourseInput.value,
            type: addAssignmentTypeInput.value,
            dueDate: addAssignmentDueDateInput.value,
            status: 'pending',
            desc: addAssignmentDescInput.value,
            points: 0
        };
        assignments.push(newAssignment);
        addModal.style.display = 'none';
        renderAssignments();
    });

    // Mở modal Sửa
    function handleEdit(id) {
        const assignment = assignments.find(a => a.id == id);
        if (assignment) {
            editAssignmentIdInput.value = assignment.id;
            editAssignmentTitleInput.value = assignment.title;
            editAssignmentCourseInput.value = assignment.course;
            editAssignmentTypeInput.value = assignment.type;
            editAssignmentDueDateInput.value = assignment.dueDate;
            editAssignmentDescInput.value = assignment.desc;
            editAssignmentPointsInput.value = assignment.points ? assignment.points : 1;
            editAssignmentStatusInput.value = assignment.status ? assignment.status : 'pending';
            editModal.style.display = 'block';
        }
    }
    closeEditModalBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    // Submit Sửa
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = editAssignmentIdInput.value;
        const updatedAssignment = {
            id: Number(id),
            title: editAssignmentTitleInput.value,
            course: editAssignmentCourseInput.value,
            type: editAssignmentTypeInput.value,
            dueDate: editAssignmentDueDateInput.value,
            status: editAssignmentStatusInput.value,
            desc: editAssignmentDescInput.value,
            points: Number(editAssignmentPointsInput.value)
        };
        const idx = assignments.findIndex(a => a.id == id);
        if (idx !== -1) assignments[idx] = updatedAssignment;
        editModal.style.display = 'none';
        renderAssignments();
    });

    function handleDelete(id) {
        if (confirm('Bạn có chắc muốn xóa bài này?')) {
            const idx = assignments.findIndex(a => a.id == id);
            if (idx !== -1) {
                assignments.splice(idx, 1);
                renderAssignments();
            }
        }
    }

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
                    <button class="action-btn btn-secondary view-btn" data-id="${assignment.id}"><i class="fas fa-eye"></i> Xem</button>
                    <button class="action-btn btn-secondary edit-btn" data-id="${assignment.id}"><i class="fas fa-edit"></i> Sửa</button>
                    <button class="action-btn btn-secondary delete-btn" data-id="${assignment.id}"><i class="fas fa-trash"></i> Xóa</button>
                </div>
            </div>
        `).join('');

        // Gán sự kiện cho nút Sửa/Xóa
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                handleEdit(this.getAttribute('data-id'));
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                handleDelete(this.getAttribute('data-id'));
            });
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }
}); 