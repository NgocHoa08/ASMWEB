document.addEventListener('DOMContentLoaded', function() {
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

    // Danh sách yêu cầu thay đổi lịch học
    let requests = [];

    // Render lịch học
    renderSchedule();
    renderRequestList();
    setupEventListeners();

    // ====== YÊU CẦU THAY ĐỔI LỊCH HỌC ======
    function openRequestModal() {
        document.getElementById('requestForm').reset();
        document.getElementById('requestModal').style.display = 'flex';
    }

    function closeRequestModal() {
        document.getElementById('requestModal').style.display = 'none';
    }

    function submitRequest(event) {
        event.preventDefault();
        const type = document.getElementById('requestType').value;
        const timeSlot = document.getElementById('requestTimeSlot').value;
        const day = document.getElementById('requestDay').value;
        const course = document.getElementById('requestCourse').value;
        const title = document.getElementById('requestTitle').value;
        const room = document.getElementById('requestRoom').value;
        const instructor = document.getElementById('requestInstructor').value;
        const reason = document.getElementById('requestReason').value;
        const id = Date.now();
        requests.unshift({
            id,
            type,
            timeSlot,
            day,
            course,
            title,
            room,
            instructor,
            reason,
            status: 'pending',
            createdAt: new Date().toLocaleString()
        });
        renderRequestList();
        closeRequestModal();
        showNotification('Yêu cầu của bạn đã được gửi!', 'success');
    }

    function renderRequestList() {
        const requestList = document.getElementById('requestList');
        if (!requests.length) {
            requestList.innerHTML = '<div class="empty-request">Chưa có yêu cầu nào.</div>';
            return;
        }
        requestList.innerHTML = requests.map(req => `
            <div class="request-item request-${req.status}">
                <div class="request-info">
                    <b>${getRequestTypeText(req.type)}</b> | <span>${scheduleData.timeSlots[req.timeSlot] || ''} - ${scheduleData.days[req.day] || ''}</span><br>
                    <span>${req.course} - ${req.title} | Phòng: ${req.room} | GV: ${req.instructor}</span>
                </div>
                <div class="request-reason">
                    <b>Lý do:</b> ${req.reason}
                </div>
                <div class="request-meta">
                    <span class="request-status">Trạng thái: <b>${getStatusText(req.status)}</b></span>
                    <span class="request-time">${req.createdAt}</span>
                </div>
            </div>
        `).join('');
    }

    function getRequestTypeText(type) {
        if (type === 'add') return 'Yêu cầu thêm lịch học';
        if (type === 'edit') return 'Yêu cầu sửa lịch học';
        if (type === 'delete') return 'Yêu cầu xóa lịch học';
        return '';
    }
    function getStatusText(status) {
        if (status === 'pending') return 'Chờ duyệt';
        if (status === 'approved') return 'Đã duyệt';
        if (status === 'rejected') return 'Từ chối';
        return '';
    }

    // ===== SCHEDULE VIEW ONLY =====
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
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Đóng modal khi click bên ngoài
        document.getElementById('requestModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeRequestModal();
            }
        });
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

    // Gán global cho HTML
    window.openRequestModal = openRequestModal;
    window.closeRequestModal = closeRequestModal;
    window.submitRequest = submitRequest;
}); 