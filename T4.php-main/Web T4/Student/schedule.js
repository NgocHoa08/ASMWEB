document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu thông báo
    const announcements = [
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

    // Dữ liệu lịch học
    const scheduleData = {
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
                { course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                { course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                null,
                { course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" },
                { course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                null
            ],
            [
                null,
                { course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" },
                { course: "006", title: "Java nâng cao", room: "B204", instructor: "Trần Thị F" },
                null,
                { course: "007", title: "Mobile App", room: "C306", instructor: "Lê Văn G" },
                { course: "008", title: "Tiếng Anh", room: "D402", instructor: "Phạm Thị H" }
            ],
            [
                { course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                null,
                { course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                { course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                null,
                { course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" }
            ],
            [
                { course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" },
                { course: "007", title: "Mobile App", room: "C306", instructor: "Lê Văn G" },
                null,
                { course: "008", title: "Tiếng Anh", room: "D402", instructor: "Phạm Thị H" },
                { course: "006", title: "Java nâng cao", room: "B204", instructor: "Trần Thị F" },
                null
            ],
            [
                { course: "003", title: "Python cho AI", room: "C305", instructor: "Lê Văn C" },
                null,
                { course: "001", title: "Lập trình Web", room: "A101", instructor: "Nguyễn Văn A" },
                { course: "002", title: "Cơ sở dữ liệu", room: "B203", instructor: "Trần Thị B" },
                { course: "004", title: "Kỹ năng mềm", room: "D401", instructor: "Phạm Thị D" },
                { course: "005", title: "Toán rời rạc", room: "A102", instructor: "Nguyễn Văn E" }
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
                <button class="announcement-close" onclick="removeAnnouncement(${announcement.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    function removeAnnouncement(id) {
        const announcement = document.querySelector(`[data-id="${id}"]`);
        if (announcement) {
            announcement.style.opacity = '0';
            announcement.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                announcement.remove();
                // Có thể thêm logic lưu vào localStorage để không hiển thị lại
                saveDismissedAnnouncement(id);
            }, 300);
        }
    }

    function saveDismissedAnnouncement(id) {
        let dismissed = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
        dismissed.push(id);
        localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissed));
    }

    function renderSchedule() {
        const scheduleBody = document.querySelector('.schedule-body');
        
        scheduleBody.innerHTML = scheduleData.schedule.map((row, rowIndex) => `
            <div class="schedule-row">
                <div class="time-slot">${scheduleData.timeSlots[rowIndex]}</div>
                ${row.map(cell => {
                    if (cell === null) {
                        return '<div class="class-slot empty"></div>';
                    } else {
                        return `
                            <div class="class-slot" data-course="${cell.course}">
                                ${cell.course} - ${cell.title}<br>
                                <small>Phòng ${cell.room} | GV: ${cell.instructor}</small>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Thêm sự kiện click cho các ô lịch học
        document.addEventListener('click', function(e) {
            if (e.target.closest('.class-slot:not(.empty)')) {
                const slot = e.target.closest('.class-slot');
                const courseCode = slot.getAttribute('data-course');
                const courseName = slot.textContent.split('\n')[0];
                const room = slot.querySelector('small').textContent;
                
                showCourseDetails(courseCode, courseName, room);
            }
        });
    }
    
    function showCourseDetails(courseCode, courseName, room) {
        // Tạo thông báo đơn giản (có thể thay bằng modal hoặc popup)
        const message = `Khóa học: ${courseName}\nMã môn: ${courseCode}\nPhòng học: ${room}\nThời gian: Xem trong lịch`;
        
        alert(message);
        
        // Hoặc có thể tạo modal đẹp hơn:
        // createModal(courseCode, courseName, room);
    }
    
    // Hàm tạo modal (tùy chọn)
    function createModal(courseCode, courseName, room) {
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${courseName}</h3>
                <p><strong>Mã môn:</strong> ${courseCode}</p>
                <p><strong>Phòng học:</strong> ${room}</p>
                <button onclick="this.parentElement.parentElement.remove()">Đóng</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Thêm function global để có thể gọi từ HTML
    window.removeAnnouncement = removeAnnouncement;
}); 