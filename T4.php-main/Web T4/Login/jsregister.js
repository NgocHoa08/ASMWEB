// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Toggle confirm password visibility
function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleBtn = document.querySelectorAll('.password-toggle')[1].querySelector('i');
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        confirmPasswordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Handle form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!fullname || !email || !password || !confirmPassword) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        const registerBtn = document.querySelector('.login-btn');
        const originalText = registerBtn.innerHTML;
        
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng ký...';
        registerBtn.disabled = true;

        fetch('register.php', {
            method: 'POST',
            body: new URLSearchParams(new FormData(registerForm))
        }).then(response => {
            if (!response.ok) {
                throw new Error('Lỗi server');
            }
            return response.json();
        }).then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = data.redirect;
            } else if (data.error) {
                alert(data.error);
            }
            registerBtn.innerHTML = originalText;
            registerBtn.disabled = false;
        }).catch(error => {
            console.error('Lỗi:', error);
            alert('Lỗi: ' + error.message);
            registerBtn.innerHTML = originalText;
            registerBtn.disabled = false;
        });
    });
}