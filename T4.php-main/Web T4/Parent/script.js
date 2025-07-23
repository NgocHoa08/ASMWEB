document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  // Xác định tên file hiện tại (không có query/hash)
  const currentPage = location.pathname.split('/').pop();
  navLinks.forEach(link => {
    // Lấy tên file từ href của link
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
