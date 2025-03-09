document.addEventListener('DOMContentLoaded', function() {
    const joinButton = document.getElementById('joinBtn');
    const meetLink = 'https://meet.google.com/gsc-hvym-ega';
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    joinButton.addEventListener('click', function() {
        // Tạm dừng hiệu ứng heartbeat khi click
        this.style.animation = 'none';
        
        // Thêm animation khi click sau một khoảng delay nhỏ
        setTimeout(() => {
            this.classList.add('clicked');
        }, 10);
        
        // Xóa class sau khi animation kết thúc
        setTimeout(() => {
            this.classList.remove('clicked');
            // Khôi phục lại hiệu ứng heartbeat
            this.style.animation = 'heartbeat 1.5s ease-in-out infinite';
        }, 600);

        // Delay mở link để animation có thể hoàn thành
        setTimeout(() => {
            window.open(meetLink, '_blank');
        }, 400);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Thêm code điều chỉnh chiều cao slider
    const hero = document.getElementById('hero');
    const slider = document.querySelector('.slider');
    
    function adjustSliderHeight() {
        const heroHeight = hero.offsetHeight;
        slider.style.height = heroHeight + 'px';
    }
    
    // Điều chỉnh khi trang load và khi resize
    adjustSliderHeight();
    window.addEventListener('resize', adjustSliderHeight);

    const sliderSection = document.querySelector('.slider');
    const body = document.body;

    window.addEventListener('scroll', () => {
        const sliderBottom = sliderSection.offsetTop + sliderSection.offsetHeight;
        if (window.scrollY > sliderBottom - 80) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    });
});
