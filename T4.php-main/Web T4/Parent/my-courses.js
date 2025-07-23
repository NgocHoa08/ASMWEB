document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        {
            code: "001",
            title: "Lập trình Web cơ bản",
            image: "images/web.jpg",
            desc: "Khóa học cung cấp kiến thức nền tảng về HTML, CSS và JavaScript, giúp sinh viên tự xây dựng các trang web tĩnh và động cơ bản, làm quen với tư duy lập trình web hiện đại.",
            instructor: "Nguyễn Văn A"
        },
        {
            code: "002",
            title: "Cơ sở dữ liệu",
            image: "images/db.jpg",
            desc: "Tìm hiểu về các hệ quản trị cơ sở dữ liệu, cách thiết kế, xây dựng và tối ưu hóa cơ sở dữ liệu quan hệ, thực hành truy vấn SQL và quản lý dữ liệu thực tế.",
            instructor: "Trần Thị B"
        },
        {
            code: "003",
            title: "Python cho AI",
            image: "images/python.jpg",
            desc: "Khóa học tập trung vào lập trình Python ứng dụng trong trí tuệ nhân tạo và học máy, bao gồm xử lý dữ liệu, xây dựng mô hình và triển khai các thuật toán AI cơ bản.",
            instructor: "Lê Văn C"
        },
        {
            code: "004",
            title: "Kỹ năng mềm",
            image: "images/softskills.jpg",
            desc: "Phát triển kỹ năng giao tiếp, làm việc nhóm, giải quyết vấn đề, thuyết trình và quản lý thời gian, giúp sinh viên tự tin và hiệu quả hơn trong học tập và công việc.",
            instructor: "Phạm Thị D"
        },
        {
            code: "005",
            title: "Toán rời rạc",
            image: "images/math.jpg",
            desc: "Trang bị kiến thức về logic toán học, tập hợp, quan hệ, đồ thị và ứng dụng trong công nghệ thông tin, hỗ trợ tư duy thuật toán và phân tích hệ thống.",
            instructor: "Nguyễn Văn E"
        },
        {
            code: "006",
            title: "Java nâng cao",
            image: "images/java.jpg",
            desc: "Khóa học chuyên sâu về lập trình hướng đối tượng với Java, phát triển ứng dụng thực tế với Spring Boot, JDBC, RESTful API và triển khai dự án phần mềm.",
            instructor: "Trần Thị F"
        },
        {
            code: "007",
            title: "Phát triển ứng dụng di động",
            image: "images/mobile.jpg",
            desc: "Học cách xây dựng ứng dụng di động đa nền tảng với React Native và Flutter, thực hành phát triển, kiểm thử và triển khai ứng dụng trên thiết bị thật.",
            instructor: "Lê Văn G"
        },
        {
            code: "008",
            title: "Tiếng Anh chuyên ngành",
            image: "images/english.jpg",
            desc: "Nâng cao kỹ năng tiếng Anh chuyên ngành CNTT: từ vựng, giao tiếp, đọc hiểu tài liệu kỹ thuật, viết email và báo cáo chuyên môn.",
            instructor: "Phạm Thị H"
        }
    ];

    const coursesGrid = document.querySelector('.courses-grid');
    
    coursesGrid.innerHTML = courses.map(course => `
        <div class="course-card">
            <img class="course-img" src="${course.image}" alt="${course.title}">
            <div class="course-title"><span class="course-code">${course.code}</span> - ${course.title}</div>
            <div class="course-desc">${course.desc}</div>
            <div class="course-meta">Giảng viên: ${course.instructor}</div>
            <button class="course-view-btn">Xem</button>
        </div>
    `).join('');
});
