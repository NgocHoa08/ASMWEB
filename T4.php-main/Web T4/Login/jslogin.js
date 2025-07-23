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

// Handle form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...';
        loginBtn.disabled = true;
        
        fetch('Login.php', {
            method: 'POST',
            body: new URLSearchParams(new FormData(loginForm))
        }).then(response => {
            if (!response.ok) {
                throw new Error('Lỗi server');
            }
            return response.json();
        }).then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else if (data.error) {
                alert(data.error);
            }
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }).catch(error => {
            console.error('Lỗi:', error);
            alert('Lỗi: ' + error.message);
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        });
    });
}

// Forgot password (placeholder)
const forgotPassword = document.querySelector('.forgot-password');
if (forgotPassword) {
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Tính năng khôi phục mật khẩu sẽ được phát triển sau!');
    });
}