document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu thông báo
    let announcements = [
        {
            id: 1,
            title: "Lịch thi cuối kỳ",
            content: "Lịch thi cuối kỳ sẽ được công bố vào tuần tới. Sinh viên vui lòng theo dõi thông báo.",
            time: "2 giờ trước",
            type: "warning",
            icon: "fas fa-exclamation-triangle",
            priority: "high"
        },
        {
            id: 2,
            title: "Thay đổi lịch học",
            content: "Môn Lập trình Web (Thứ 3, 8:45-10:15) sẽ được dời sang Thứ 4 cùng giờ do giáo viên bận việc.",
            time: "1 ngày trước",
            type: "info",
            icon: "fas fa-info-circle",
            priority: "medium"
        },
        {
            id: 3,
            title: "Đăng ký môn học",
            content: "Thời gian đăng ký môn học học kỳ mới bắt đầu từ ngày 15/01/2025. Sinh viên vui lòng hoàn thành trước ngày 30/01.",
            time: "3 ngày trước",
            type: "success",
            icon: "fas fa-calendar-check",
            priority: "high"
        },
        {
            id: 4,
            title: "Nộp bài tập",
            content: "Hạn nộp bài tập tuần 5 môn Cơ sở dữ liệu là ngày mai. Sinh viên vui lòng nộp đúng hạn.",
            time: "5 giờ trước",
            type: "warning",
            icon: "fas fa-clock",
            priority: "high"
        },
        {
            id: 5,
            title: "Thông báo mới",
            content: "Hệ thống LMS sẽ được bảo trì từ 22:00-24:00 ngày mai. Sinh viên vui lòng lưu ý.",
            time: "6 giờ trước",
            type: "info",
            icon: "fas fa-tools",
            priority: "medium"
        }
    ];

    // Mapping icon cho từng loại thông báo
    const typeIcons = {
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-triangle",
        success: "fas fa-check-circle",
        error: "fas fa-times-circle"
    };

    // Dữ liệu lịch học
    let scheduleData = {
        timeSlots: [
            "7:00 - 8:30",
            "8:45 - 10:15", 
            "10:30 - 12:00",
            "13:30 - 15:00",
            "15:00 - 17:00"
        ],
        days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        schedule: [
            [
                { id: 1, course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                { id: 2, course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                null,
                { id: 3, course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" },
                { id: 4, course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                null
            ],
            [
                null,
                { id: 5, course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" },
                { id: 6, course: "006", title: "Java nâng cao", room: "B204", instructor: "Trần Thị F" },
                null,
                { id: 7, course: "007", title: "Mobile App", room: "C306", instructor: "Lê Văn G" },
                { id: 8, course: "008", title: "Tiếng Anh", room: "D402", instructor: "Phạm Thị H" }
            ],
            [
                { id: 9, course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                null,
                { id: 10, course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                { id: 11, course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                null,
                { id: 12, course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" }
            ],
            [
                { id: 13, course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" },
                { id: 14, course: "007", title: "Mobile App", room: "C306", instructor: "Lê Văn G" },
                null,
                { id: 15, course: "008", title: "Tiếng Anh", room: "D402", instructor: "Phạm Thị H" },
                { id: 16, course: "006", title: "Java nâng cao", room: "B204", instructor: "Trần Thị F" },
                null
            ],
            [
                { id: 17, course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" },
                null,
                { id: 18, course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                { id: 19, course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                { id: 20, course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                { id: 21, course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" }
            ]
        ]
    };

    // Render thông báo và lịch học
    renderAnnouncements();
    renderSchedule();
    setupEventListeners();

    function renderAnnouncements() {
        const announcementList = document.getElementById('announcementList');
        
        announcementList.innerHTML = announcements.map(announcement => `
            <div class="announcement-item" data-id="${announcement.id}" data-priority="${announcement.priority}">
                <div class="announcement-icon">
                    <i class="${announcement.icon}"></i>
                </div>
                <div class="announcement-content">
                    <h4>${announcement.title}</h4>
                    <p>${announcement.content}</p>
                    <span class="announcement-time">${announcement.time}</span>
                </div>
                <div class="announcement-actions">
                    <button class="edit-btn" onclick="editAnnouncement(${announcement.id})" title="Sửa thông báo">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteAnnouncement(${announcement.id})" title="Xóa thông báo">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function openAddModal() {
        document.getElementById('modalTitle').textContent = 'Thêm thông báo mới';
        document.getElementById('announcementId').value = '';
        document.getElementById('announcementForm').reset();
        document.getElementById('announcementModal').style.display = 'flex';
    }

    function editAnnouncement(id) {
        const announcement = announcements.find(a => a.id === id);
        if (announcement) {
            document.getElementById('modalTitle').textContent = 'Sửa thông báo';
            document.getElementById('announcementId').value = announcement.id;
            document.getElementById('announcementTitle').value = announcement.title;
            document.getElementById('announcementContent').value = announcement.content;
            document.getElementById('announcementType').value = announcement.type;
            document.getElementById('announcementPriority').value = announcement.priority;
            document.getElementById('announcementModal').style.display = 'flex';
        }
    }

    function deleteAnnouncement(id) {
        if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
            announcements = announcements.filter(a => a.id !== id);
            renderAnnouncements();
            showNotification('Đã xóa thông báo thành công!', 'success');
        }
    }

    function saveAnnouncement(event) {
        event.preventDefault();
        
        const id = document.getElementById('announcementId').value;
        const title = document.getElementById('announcementTitle').value;
        const content = document.getElementById('announcementContent').value;
        const type = document.getElementById('announcementType').value;
        const priority = document.getElementById('announcementPriority').value;
        
        if (id) {
            // Sửa thông báo
            const index = announcements.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                announcements[index] = {
                    ...announcements[index],
                    title,
                    content,
                    type,
                    priority,
                    icon: typeIcons[type]
                };
                showNotification('Đã cập nhật thông báo thành công!', 'success');
            }
        } else {
            // Thêm thông báo mới
            const newId = Math.max(...announcements.map(a => a.id), 0) + 1;
            const newAnnouncement = {
                id: newId,
                title,
                content,
                time: 'Vừa đăng',
                type,
                icon: typeIcons[type],
                priority
            };
            announcements.unshift(newAnnouncement);
            showNotification('Đã thêm thông báo mới thành công!', 'success');
        }
        
        renderAnnouncements();
        closeModal();
    }

    function closeModal() {
        document.getElementById('announcementModal').style.display = 'none';
    }

    // ===== SCHEDULE MANAGEMENT FUNCTIONS =====

    function openScheduleModal() {
        document.getElementById('scheduleModalTitle').textContent = 'Thêm lịch học mới';
        document.getElementById('scheduleId').value = '';
        document.getElementById('scheduleRow').value = '';
        document.getElementById('scheduleCol').value = '';
        document.getElementById('scheduleForm').reset();
        document.getElementById('scheduleModal').style.display = 'flex';
    }

    function editSchedule(row, col) {
        const scheduleItem = scheduleData.schedule[row][col];
        if (scheduleItem) {
            document.getElementById('scheduleModalTitle').textContent = 'Sửa lịch học';
            document.getElementById('scheduleId').value = scheduleItem.id;
            document.getElementById('scheduleRow').value = row;
            document.getElementById('scheduleCol').value = col;
            document.getElementById('scheduleTimeSlot').value = row;
            document.getElementById('scheduleDay').value = col;
            document.getElementById('scheduleCourse').value = scheduleItem.course;
            document.getElementById('scheduleTitle').value = scheduleItem.title;
            document.getElementById('scheduleRoom').value = scheduleItem.room;
            document.getElementById('scheduleInstructor').value = scheduleItem.instructor;
            document.getElementById('scheduleModal').style.display = 'flex';
        }
    }

    function deleteSchedule(row, col) {
        const scheduleItem = scheduleData.schedule[row][col];
        if (scheduleItem) {
            showCustomConfirm(
                `Bạn có chắc chắn muốn xóa môn học "${scheduleItem.title}"?`,
                () => {
                    scheduleData.schedule[row][col] = null;
                    renderSchedule();
                    showNotification('Đã xóa lịch học thành công!', 'success');
                }
            );
        }
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

    function saveSchedule(event) {
        event.preventDefault();
        
        const id = document.getElementById('scheduleId').value;
        const row = parseInt(document.getElementById('scheduleRow').value);
        const col = parseInt(document.getElementById('scheduleCol').value);
        const timeSlot = document.getElementById('scheduleTimeSlot').value;
        const day = document.getElementById('scheduleDay').value;
        const course = document.getElementById('scheduleCourse').value;
        const title = document.getElementById('scheduleTitle').value;
        const room = document.getElementById('scheduleRoom').value;
        const instructor = document.getElementById('scheduleInstructor').value;
        
        if (id) {
            // Sửa lịch học
            if (scheduleData.schedule[row] && scheduleData.schedule[row][col]) {
                scheduleData.schedule[row][col] = {
                    id: parseInt(id),
                    course,
                    title,
                    room,
                    instructor
                };
                showNotification('Đã cập nhật lịch học thành công!', 'success');
            }
        } else {
            // Thêm lịch học mới
            const newRow = parseInt(timeSlot);
            const newCol = parseInt(day);
            const newId = Math.max(...scheduleData.schedule.flat().filter(item => item && item.id).map(item => item.id), 0) + 1;
            
            // Kiểm tra xem slot đã có lịch học chưa
            if (scheduleData.schedule[newRow] && scheduleData.schedule[newRow][newCol]) {
                showNotification('Slot này đã có lịch học! Vui lòng chọn slot khác.', 'error');
                return;
            }
            
            // Đảm bảo mảng tồn tại
            if (!scheduleData.schedule[newRow]) {
                scheduleData.schedule[newRow] = new Array(6).fill(null);
            }
            
            scheduleData.schedule[newRow][newCol] = {
                id: newId,
                course,
                title,
                room,
                instructor
            };
            showNotification('Đã thêm lịch học mới thành công!', 'success');
        }
        
        renderSchedule();
        closeScheduleModal();
    }

    function closeScheduleModal() {
        document.getElementById('scheduleModal').style.display = 'none';
    }

    function renderSchedule() {
        const scheduleBody = document.querySelector('.schedule-body');
        
        scheduleBody.innerHTML = scheduleData.schedule.map((row, rowIndex) => `
            <div class="schedule-row">
                <div class="time-slot">${scheduleData.timeSlots[rowIndex]}</div>
                ${row.map((cell, colIndex) => {
                    if (cell === null) {
                        return '<div class="class-slot empty"></div>';
                    } else {
                        return `
                            <div class="class-slot" data-course="${cell.course}" data-id="${cell.id}">
                                <div class="schedule-content">
                                    ${cell.course} - ${cell.title}<br>
                                    <small>Phòng ${cell.room} | GV: ${cell.instructor}</small>
                                </div>
                                <div class="schedule-actions">
                                    <button class="edit-schedule-btn" onclick="editSchedule(${rowIndex}, ${colIndex})" title="Sửa lịch học">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="delete-schedule-btn" onclick="deleteSchedule(${rowIndex}, ${colIndex})" title="Xóa lịch học">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `).join('');
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
        document.getElementById('announcementModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        document.getElementById('scheduleModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeScheduleModal();
            }
        });

        // Thêm sự kiện click cho các ô lịch học (chỉ khi click vào nội dung, không phải nút sửa/xóa)
        document.addEventListener('click', function(e) {
            // Kiểm tra xem có phải click vào nút sửa/xóa không
            if (e.target.closest('.edit-schedule-btn') || e.target.closest('.delete-schedule-btn')) {
                return; // Không làm gì nếu click vào nút sửa/xóa
            }
            
            // Chỉ hiện popup khi click vào nội dung lịch học
            if (e.target.closest('.schedule-content') || (e.target.closest('.class-slot:not(.empty)') && !e.target.closest('.schedule-actions'))) {
                const slot = e.target.closest('.class-slot');
                const courseCode = slot.getAttribute('data-course');
                const courseName = slot.querySelector('.schedule-content').textContent.split('\n')[0];
                const room = slot.querySelector('small').textContent;
                
                showCourseDetails(courseCode, courseName, room);
            }
        });
    }
    
    function showCourseDetails(courseCode, courseName, room) {
        const message = `Khóa học: ${courseName}\nMã môn: ${courseCode}\nPhòng học: ${room}\nThời gian: Xem trong lịch`;
        alert(message);
    }

    // Thêm functions global để có thể gọi từ HTML
    window.openAddModal = openAddModal;
    window.editAnnouncement = editAnnouncement;
    window.deleteAnnouncement = deleteAnnouncement;
    window.closeModal = closeModal;
    window.saveAnnouncement = saveAnnouncement;
    
    // Schedule functions
    window.openScheduleModal = openScheduleModal;
    window.editSchedule = editSchedule;
    window.deleteSchedule = deleteSchedule;
    window.closeScheduleModal = closeScheduleModal;
    window.saveSchedule = saveSchedule;
}); 