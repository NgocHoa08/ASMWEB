document.addEventListener('DOMContentLoaded', function() {
    let courses = [
        {
            id: 1,
            code: "001",
            title: "Lập trình Web cơ bản",
            image: "images/web.jpg",
            desc: "Khóa học cung cấp kiến thức nền tảng về HTML, CSS và JavaScript, giúp sinh viên tự xây dựng các trang web tĩnh và động cơ bản, làm quen với tư duy lập trình web hiện đại.",
            instructor: "Nguyễn Văn A"
        },
        {
            id: 2,
            code: "002",
            title: "Cơ sở dữ liệu",
            image: "images/db.jpg",
            desc: "Tìm hiểu về các hệ quản trị cơ sở dữ liệu, cách thiết kế, xây dựng và tối ưu hóa cơ sở dữ liệu quan hệ, thực hành truy vấn SQL và quản lý dữ liệu thực tế.",
            instructor: "Trần Thị B"
        },
        {
            id: 3,
            code: "003",
            title: "Python cho AI",
            image: "images/python.jpg",
            desc: "Khóa học tập trung vào lập trình Python ứng dụng trong trí tuệ nhân tạo và học máy, bao gồm xử lý dữ liệu, xây dựng mô hình và triển khai các thuật toán AI cơ bản.",
            instructor: "Lê Văn C"
        },
        {
            id: 4,
            code: "004",
            title: "Kỹ năng mềm",
            image: "images/softskills.jpg",
            desc: "Phát triển kỹ năng giao tiếp, làm việc nhóm, giải quyết vấn đề, thuyết trình và quản lý thời gian, giúp sinh viên tự tin và hiệu quả hơn trong học tập và công việc.",
            instructor: "Phạm Thị D"
        },
        {
            id: 5,
            code: "005",
            title: "Toán rời rạc",
            image: "images/math.jpg",
            desc: "Trang bị kiến thức về logic toán học, tập hợp, quan hệ, đồ thị và ứng dụng trong công nghệ thông tin, hỗ trợ tư duy thuật toán và phân tích hệ thống.",
            instructor: "Nguyễn Văn E"
        },
        {
            id: 6,
            code: "006",
            title: "Java nâng cao",
            image: "images/java.jpg",
            desc: "Khóa học chuyên sâu về lập trình hướng đối tượng với Java, phát triển ứng dụng thực tế với Spring Boot, JDBC, RESTful API và triển khai dự án phần mềm.",
            instructor: "Trần Thị F"
        },
        {
            id: 7,
            code: "007",
            title: "Phát triển ứng dụng di động",
            image: "images/mobile.jpg",
            desc: "Học cách xây dựng ứng dụng di động đa nền tảng với React Native và Flutter, thực hành phát triển, kiểm thử và triển khai ứng dụng trên thiết bị thật.",
            instructor: "Lê Văn G"
        },
        {
            id: 8,
            code: "008",
            title: "Tiếng Anh chuyên ngành",
            image: "images/english.jpg",
            desc: "Nâng cao kỹ năng tiếng Anh chuyên ngành CNTT: từ vựng, giao tiếp, đọc hiểu tài liệu kỹ thuật, viết email và báo cáo chuyên môn.",
            instructor: "Phạm Thị H"
        }
    ];

    // Render khóa học
    renderCourses();
    setupEventListeners();

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
                <img class="course-img" src="${course.image}" alt="${course.title}" onerror="this.src='images/default.jpg'">
                <div class="course-title"><span class="course-code">${course.code}</span> - ${course.title}</div>
                <div class="course-desc">${course.desc}</div>
                <div class="course-meta">Giảng viên: ${course.instructor}</div>
                <button class="course-view-btn">Xem</button>
            </div>
        `).join('');
    }

    function openCourseModal() {
        document.getElementById('courseModalTitle').textContent = 'Thêm khóa học mới';
        document.getElementById('courseId').value = '';
        document.getElementById('courseForm').reset();
        document.getElementById('courseModal').style.display = 'flex';
    }

    function editCourse(id) {
        const course = courses.find(c => c.id === id);
        if (course) {
            document.getElementById('courseModalTitle').textContent = 'Sửa khóa học';
            document.getElementById('courseId').value = course.id;
            document.getElementById('courseCode').value = course.code;
            document.getElementById('courseTitle').value = course.title;
            document.getElementById('courseDesc').value = course.desc;
            document.getElementById('courseInstructor').value = course.instructor;
            document.getElementById('courseImage').value = course.image;
            document.getElementById('courseModal').style.display = 'flex';
        }
    }

    function deleteCourse(id) {
        const course = courses.find(c => c.id === id);
        if (course) {
            showCustomConfirm(
                `Bạn có chắc chắn muốn xóa khóa học "${course.title}"?`,
                () => {
                    courses = courses.filter(c => c.id !== id);
                    renderCourses();
                    showNotification('Đã xóa khóa học thành công!', 'success');
                }
            );
        }
    }

    function saveCourse(event) {
        event.preventDefault();
        
        const id = document.getElementById('courseId').value;
        const code = document.getElementById('courseCode').value;
        const title = document.getElementById('courseTitle').value;
        const desc = document.getElementById('courseDesc').value;
        const instructor = document.getElementById('courseInstructor').value;
        const image = document.getElementById('courseImage').value;
        
        if (id) {
            // Sửa khóa học
            const index = courses.findIndex(c => c.id === parseInt(id));
            if (index !== -1) {
                courses[index] = {
                    ...courses[index],
                    code,
                    title,
                    desc,
                    instructor,
                    image
                };
                showNotification('Đã cập nhật khóa học thành công!', 'success');
            }
        } else {
            // Thêm khóa học mới
            const newId = Math.max(...courses.map(c => c.id), 0) + 1;
            const newCourse = {
                id: newId,
                code,
                title,
                desc,
                instructor,
                image
            };
            courses.push(newCourse);
            showNotification('Đã thêm khóa học mới thành công!', 'success');
        }
        
        renderCourses();
        closeCourseModal();
    }

    function closeCourseModal() {
        document.getElementById('courseModal').style.display = 'none';
    }

    function showCustomConfirm(message, onConfirm) {
        // Tạo custom confirm dialog
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
        
        // Lưu callback để thực thi sau khi xác nhận
        window.executeConfirmCallback = onConfirm;
        
        // Thêm animation
        setTimeout(() => {
            confirmDialog.style.opacity = '1';
            confirmDialog.querySelector('.custom-confirm-dialog').style.transform = 'scale(1)';
        }, 10);
    }

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

    function setupEventListeners() {
        // Đóng modal khi click bên ngoài
        document.getElementById('courseModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeCourseModal();
            }
        });
    }

    // Thêm functions global để có thể gọi từ HTML
    window.openCourseModal = openCourseModal;
    window.editCourse = editCourse;
    window.deleteCourse = deleteCourse;
    window.closeCourseModal = closeCourseModal;
    window.saveCourse = saveCourse;
});
