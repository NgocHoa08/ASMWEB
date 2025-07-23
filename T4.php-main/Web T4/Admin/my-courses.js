
document.addEventListener('DOMContentLoaded', function() {
    let courses = [];
    let users = [];
    let currentUser = null; // Lưu thông tin người dùng hiện tại

    // Kiểm tra trạng thái đăng nhập và vai trò
    async function checkAuth() {
        try {
            const response = await fetch('/api/auth.php');
            if (response.ok) {
                currentUser = await response.json();
                if (currentUser.role === 'admin') {
                    document.getElementById('manage-accounts').style.display = 'block';
                }
            } else {
                currentUser = null;
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra đăng nhập:', error);
        }
    }

    // Lấy danh sách khóa học từ backend
    async function fetchCourses() {
        try {
            const response = await fetch('/api/courses.php');
            courses = await response.json();
            renderCourses();
        } catch (error) {
            console.error('Lỗi khi tải khóa học:', error);
            showNotification('Lỗi khi tải khóa học', 'error');
        }
    }

    // Lấy danh sách người dùng cho dropdown giảng viên và quản lý tài khoản
    async function fetchUsers() {
        try {
            const response = await fetch('/api/users.php');
            users = await response.json();
            renderInstructorOptions();
        } catch (error) {
            console.error('Lỗi khi tải người dùng:', error);
        }
    }

    // Hiển thị danh sách khóa học
    function renderCourses() {
        const coursesGrid = document.querySelector('.courses-grid');
        coursesGrid.innerHTML = courses.map(course => `
            <div class="course-card" data-id="${course.id}">
                <div class="course-actions">
                    <button class="edit-course-btn" onclick="editCourse(${course.id})" title="Sửa khóa học">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-course-btn" onclick="deleteCourse(${course.id})" title="Xóa khóa học">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <img class="course-img" src="${course.image_url}" alt="${course.title}" onerror="this.src='images/default.jpg'">
                <div class="course-title"><span class="course-code">${course.code}</span> - ${course.title}</div>
                <div class="course-desc">${course.description}</div>
                <div class="course-meta">Giảng viên: ${course.instructor}</div>
                <button class="course-view-btn">Xem</button>
            </div>
        `).join('');
    }

    // Hiển thị danh sách giảng viên trong form khóa học
    function renderInstructorOptions() {
        const instructorSelect = document.getElementById('courseInstructor');
        instructorSelect.innerHTML = users
            .filter(user => user.role === 'instructor' || user.role === 'admin')
            .map(user => `<option value="${user.id}">${user.full_name}</option>`)
            .join('');
    }

    // Mở modal thêm/sửa khóa học
    function openCourseModal() {
        document.getElementById('courseModalTitle').textContent = 'Thêm khóa học mới';
        document.getElementById('courseId').value = '';
        document.getElementById('courseForm').reset();
        document.getElementById('courseModal').style.display = 'flex';
    }

    // Sửa khóa học
    function editCourse(id) {
        const course = courses.find(c => c.id === id);
        if (course) {
            document.getElementById('courseModalTitle').textContent = 'Sửa khóa học';
            document.getElementById('courseId').value = course.id;
            document.getElementById('courseCode').value = course.code;
            document.getElementById('courseTitle').value = course.title;
            document.getElementById('courseDesc').value = course.description;
            document.getElementById('courseInstructor').value = course.instructor_id;
            document.getElementById('courseImage').value = course.image_url;
            document.getElementById('courseModal').style.display = 'flex';
        }
    }

    // Xóa khóa học
    async function deleteCourse(id) {
        const course = courses.find(c => c.id === id);
        if (course) {
            showCustomConfirm(
                `Bạn có chắc chắn muốn xóa khóa học "${course.title}"?`,
                async () => {
                    try {
                        const response = await fetch(`/api/courses.php?id=${id}`, { method: 'DELETE' });
                        if (response.ok) {
                            courses = courses.filter(c => c.id !== id);
                            renderCourses();
                            showNotification('Đã xóa khóa học thành công!', 'success');
                        } else {
                            showNotification('Lỗi khi xóa khóa học', 'error');
                        }
                    } catch (error) {
                        console.error('Lỗi khi xóa khóa học:', error);
                        showNotification('Lỗi khi xóa khóa học', 'error');
                    }
                }
            );
        }
    }

    // Lưu khóa học
    async function saveCourse(event) {
        event.preventDefault();
        const id = document.getElementById('courseId').value;
        const code = document.getElementById('courseCode').value;
        const title = document.getElementById('courseTitle').value;
        const desc = document.getElementById('courseDesc').value;
        const instructor_id = document.getElementById('courseInstructor').value;
        const image = document.getElementById('courseImage').value;

        const courseData = { id, code, title, desc, instructor_id, image };

        try {
            const response = await fetch('/api/courses.php', {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
            if (response.ok) {
                await fetchCourses();
                showNotification(id ? 'Đã cập nhật khóa học thành công!' : 'Đã thêm khóa học mới thành công!', 'success');
                closeCourseModal();
            } else {
                showNotification('Lỗi khi lưu khóa học', 'error');
            }
        } catch (error) {
            console.error('Lỗi khi lưu khóa học:', error);
            showNotification('Lỗi khi lưu khóa học', 'error');
        }
    }

    // Đóng modal khóa học
    function closeCourseModal() {
        document.getElementById('courseModal').style.display = 'none';
    }

    // Mở modal quản lý tài khoản
    async function openAccountModal() {
        try {
            await fetchUsers();
            renderAccountList();
            document.getElementById('accountModal').style.display = 'flex';
        } catch (error) {
            console.error('Lỗi khi mở modal quản lý tài khoản:', error);
            showNotification('Lỗi khi tải danh sách tài khoản', 'error');
        }
    }

    // Đóng modal quản lý tài khoản
    function closeAccountModal() {
        document.getElementById('accountModal').style.display = 'none';
    }

    // Hiển thị danh sách tài khoản
    function renderAccountList() {
        const accountList = document.querySelector('.account-list');
        accountList.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.full_name}</td>
                            <td>${user.email}</td>
                            <td>
                                <select onchange="updateUserRole(${user.id}, this.value)">
                                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                                    <option value="instructor" ${user.role === 'instructor' ? 'selected' : ''}>Giảng viên</option>
                                    <option value="student" ${user.role === 'student' ? 'selected' : ''}>Sinh viên</option>
                                </select>
                            </td>
                            <td>
                                <button onclick="updateUserRole(${user.id}, document.querySelector('select[value=${user.id}]').value)">Lưu</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Cập nhật vai trò người dùng
    async function updateUserRole(userId, role) {
        try {
            const response = await fetch('/api/users.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, role })
            });
            if (response.ok) {
                showNotification('Đã cập nhật vai trò thành công!', 'success');
                await fetchUsers();
                renderAccountList();
            } else {
                showNotification('Lỗi khi cập nhật vai trò', 'error');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật vai trò:', error);
            showNotification('Lỗi khi cập nhật vai trò', 'error');
        }
    }

    // Hiển thị hộp thoại xác nhận
    function showCustomConfirm(message, onConfirm) {
        const confirmDialog = document.createElement('div');
        confirmDialog.className = 'custom-confirm-overlay';
        confirmDialog.innerHTML = `
            <div class="custom-confirm-dialog">
                <div class="confirm-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Xác nhận xóa</h3>
                </div>
                <div class="confirm-content">
                    <p>${message}</p>
                </div>
                <div class="confirm-actions">
                    <button class="btn-cancel-confirm" onclick="this.closest('.custom-confirm-overlay').remove()">
                        <i class="fas fa-times"></i> Hủy
                    </button>
                    <button class="btn-confirm-delete" onclick="this.closest('.custom-confirm-overlay').remove(); window.executeConfirmCallback();">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmDialog);
        window.executeConfirmCallback = onConfirm;
        setTimeout(() => {
            confirmDialog.style.opacity = '1';
            confirmDialog.querySelector('.custom-confirm-dialog').style.transform = 'scale(1)';
        }, 10);
    }

    // Hiển thị thông báo
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Thiết lập sự kiện
    function setupEventListeners() {
        document.getElementById('courseModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeCourseModal();
            }
        });
        document.getElementById('accountModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAccountModal();
            }
        });
        document.getElementById('manage-accounts').addEventListener('click', openAccountModal);
    }

    // Hàm global cho HTML
    window.openCourseModal = openCourseModal;
    window.editCourse = editCourse;
    window.deleteCourse = deleteCourse;
    window.closeCourseModal = closeCourseModal;
    window.saveCourse = saveCourse;
    window.closeAccountModal = closeAccountModal;

    // Khởi tạo
    checkAuth();
    fetchCourses();
    fetchUsers();
    setupEventListeners();
});