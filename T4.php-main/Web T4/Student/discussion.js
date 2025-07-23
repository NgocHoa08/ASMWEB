document.addEventListener('DOMContentLoaded', function() {
    const teacherList = document.getElementById('teacherList');
    const chatHeader = document.getElementById('chatHeader');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Dữ liệu giáo viên
    const teachers = [
        { id: 'teacher1', name: 'Nguyễn Văn A', subject: 'Lập trình Web', status: 'online', avatar: 'NA' },
        { id: 'teacher2', name: 'Trần Thị B', subject: 'Cơ sở dữ liệu', status: 'online', avatar: 'TB' },
        { id: 'teacher3', name: 'Lê Văn C', subject: 'Python cho AI', status: 'offline', avatar: 'LC' },
        { id: 'teacher4', name: 'Phạm Thị D', subject: 'Kỹ năng mềm', status: 'online', avatar: 'PD' },
        { id: 'teacher5', name: 'Nguyễn Văn E', subject: 'Toán rời rạc', status: 'online', avatar: 'NE' },
        { id: 'teacher6', name: 'Trần Thị F', subject: 'Java nâng cao', status: 'offline', avatar: 'TF' },
        { id: 'teacher7', name: 'Lê Văn G', subject: 'Mobile App', status: 'online', avatar: 'LG' },
        { id: 'teacher8', name: 'Phạm Thị H', subject: 'Tiếng Anh', status: 'online', avatar: 'PH' }
    ];

    // Dữ liệu tin nhắn theo từng giáo viên
    const allMessages = {
        teacher1: [
            {
                id: 1,
                text: "Chào em! Em có câu hỏi gì về bài tập tuần này không?",
                sender: "teacher",
                time: "09:30"
            },
            {
                id: 2,
                text: "Dạ thưa thầy, em muốn hỏi về phần JavaScript trong bài tập 3 ạ",
                sender: "student",
                time: "09:32"
            },
            {
                id: 3,
                text: "Em có thể giải thích rõ hơn về vấn đề em gặp phải không?",
                sender: "teacher",
                time: "09:33"
            }
        ],
        teacher2: [
            {
                id: 1,
                text: "Chào em! Em có thắc mắc gì về cơ sở dữ liệu không?",
                sender: "teacher",
                time: "10:15"
            },
            {
                id: 2,
                text: "Dạ cô, em không hiểu về normalization ạ",
                sender: "student",
                time: "10:17"
            }
        ],
        teacher3: [
            {
                id: 1,
                text: "Chào em! Em có câu hỏi gì về Python và AI không?",
                sender: "teacher",
                time: "14:20"
            }
        ],
        teacher4: [
            {
                id: 1,
                text: "Chào em! Em cần hỗ trợ gì về kỹ năng mềm không?",
                sender: "teacher",
                time: "16:45"
            }
        ],
        teacher5: [
            {
                id: 1,
                text: "Chào em! Em có thắc mắc gì về toán rời rạc không?",
                sender: "teacher",
                time: "08:30"
            }
        ],
        teacher6: [
            {
                id: 1,
                text: "Chào em! Em cần hỗ trợ gì về Java không?",
                sender: "teacher",
                time: "11:00"
            }
        ],
        teacher7: [
            {
                id: 1,
                text: "Chào em! Em có câu hỏi gì về Mobile App không?",
                sender: "teacher",
                time: "15:30"
            }
        ],
        teacher8: [
            {
                id: 1,
                text: "Hello! Do you have any questions about English?",
                sender: "teacher",
                time: "13:15"
            }
        ]
    };

    let currentTeacher = null;
    let currentMessages = [];

    // Render danh sách giáo viên
    renderTeacherList();

    // Kiểm tra trạng thái input định kỳ
    setInterval(() => {
        if (currentTeacher) {
            ensureInputEnabled();
        }
    }, 1000);

    // Xử lý gửi tin nhắn
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !this.disabled) {
            sendMessage();
        }
    });

    // Đảm bảo input luôn hoạt động khi có giáo viên được chọn
    messageInput.addEventListener('blur', function() {
        if (currentTeacher) {
            this.disabled = false;
            sendButton.disabled = false;
        }
    });

    // Debug: Log trạng thái input
    messageInput.addEventListener('change', function() {
        console.log('Input disabled:', this.disabled);
        console.log('Button disabled:', sendButton.disabled);
    });

    function renderTeacherList() {
        teacherList.innerHTML = teachers.map(teacher => `
            <div class="teacher-item" data-teacher="${teacher.id}">
                <div class="teacher-item-header">
                    <div class="teacher-avatar">
                        ${teacher.avatar}
                    </div>
                    <div class="teacher-info">
                        <div class="teacher-name">${teacher.name}</div>
                        <div class="teacher-subject">${teacher.subject}</div>
                    </div>
                </div>
                <div class="teacher-status ${teacher.status}">
                    ${teacher.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
                </div>
            </div>
        `).join('');

        // Thêm event listener cho từng giáo viên
        document.querySelectorAll('.teacher-item').forEach(item => {
            item.addEventListener('click', function() {
                const teacherId = this.getAttribute('data-teacher');
                selectTeacher(teacherId);
            });
        });
    }

    function selectTeacher(teacherId) {
        // Xóa active class từ tất cả giáo viên
        document.querySelectorAll('.teacher-item').forEach(item => {
            item.classList.remove('active');
        });

        // Thêm active class cho giáo viên được chọn
        document.querySelector(`[data-teacher="${teacherId}"]`).classList.add('active');

        currentTeacher = teacherId;
        currentMessages = allMessages[teacherId] || [];

        // Cập nhật header chat
        const teacher = teachers.find(t => t.id === teacherId);
        chatHeader.innerHTML = `
            <div class="teacher-chat-info">
                <i class="fas fa-chalkboard-teacher"></i>
                <div>
                    <h3>${teacher.name}</h3>
                    <small>${teacher.subject} - ${teacher.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}</small>
                </div>
            </div>
        `;

        // Kích hoạt chat
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.placeholder = `Nhập tin nhắn cho ${teacher.name}...`;

        // Render tin nhắn
        renderMessages();
    }

    function renderMessages() {
        if (currentMessages.length === 0) {
            chatMessages.innerHTML = '<div class="no-messages">Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</div>';
        } else {
            chatMessages.innerHTML = currentMessages.map(message => `
                <div class="message ${message.sender === 'student' ? 'sent' : 'received'}">
                    <div class="message-avatar">
                        ${message.sender === 'student' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-chalkboard-teacher"></i>'}
                    </div>
                    <div class="message-content">
                        <p class="message-text">${message.text}</p>
                        <div class="message-time">${message.time}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // Scroll xuống tin nhắn mới nhất
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Đảm bảo input vẫn hoạt động sau khi render
        ensureInputEnabled();
    }

    function ensureInputEnabled() {
        if (currentTeacher) {
            messageInput.disabled = false;
            sendButton.disabled = false;
            messageInput.placeholder = `Nhập tin nhắn cho ${teachers.find(t => t.id === currentTeacher).name}...`;
        }
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text || !currentTeacher) return;

        // Tạo tin nhắn mới
        const newMessage = {
            id: currentMessages.length + 1,
            text: text,
            sender: 'student',
            time: getCurrentTime()
        };

        // Thêm vào mảng tin nhắn hiện tại
        currentMessages.push(newMessage);
        
        // Cập nhật vào allMessages
        if (!allMessages[currentTeacher]) {
            allMessages[currentTeacher] = [];
        }
        allMessages[currentTeacher].push(newMessage);

        // Render lại tin nhắn
        renderMessages();

        // Xóa nội dung input và đảm bảo input vẫn hoạt động
        messageInput.value = '';
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus(); // Focus lại input để có thể tiếp tục nhập

        // Giả lập phản hồi từ giáo viên (sau 2 giây)
        setTimeout(() => {
            const teacherResponse = getTeacherResponse(text, currentTeacher);
            const responseMessage = {
                id: currentMessages.length + 1,
                text: teacherResponse,
                sender: 'teacher',
                time: getCurrentTime()
            };
            currentMessages.push(responseMessage);
            allMessages[currentTeacher].push(responseMessage);
            renderMessages();
            
            // Đảm bảo input vẫn hoạt động sau khi giáo viên trả lời
            messageInput.disabled = false;
            sendButton.disabled = false;
            messageInput.focus();
        }, 2000);
    }

    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    function getTeacherResponse(studentMessage, teacherId) {
        const teacher = teachers.find(t => t.id === teacherId);
        const subject = teacher.subject;
        
        const responses = {
            teacher1: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về JavaScript.",
                "Đây là một câu hỏi rất hay về lập trình web. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher2: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về cơ sở dữ liệu.",
                "Đây là một câu hỏi rất hay về normalization. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher3: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về Python và AI.",
                "Đây là một câu hỏi rất hay về AI. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher4: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về kỹ năng mềm.",
                "Đây là một câu hỏi rất hay về kỹ năng mềm. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher5: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về toán rời rạc.",
                "Đây là một câu hỏi rất hay về toán. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher6: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về Java.",
                "Đây là một câu hỏi rất hay về Java. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher7: [
                "Cảm ơn em đã hỏi! Tôi sẽ giải thích chi tiết hơn về Mobile App.",
                "Đây là một câu hỏi rất hay về mobile development. Em có thể tham khảo tài liệu trong thư viện.",
                "Tôi hiểu vấn đề của em. Hãy thử cách tiếp cận khác nhé!",
                "Em có thể xem video bài giảng để hiểu rõ hơn về chủ đề này."
            ],
            teacher8: [
                "Thank you for your question! I will explain more about English.",
                "This is a very good question about English. You can refer to the library materials.",
                "I understand your problem. Try a different approach!",
                "You can watch the lecture video to better understand this topic."
            ]
        };
        
        const teacherResponses = responses[teacherId] || responses.teacher1;
        return teacherResponses[Math.floor(Math.random() * teacherResponses.length)];
    }
}); 