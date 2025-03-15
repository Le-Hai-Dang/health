document.addEventListener('DOMContentLoaded', function() {
    const joinButton = document.getElementById('joinBtn');
    const meetLink = 'https://meet.google.com/gsc-hvym-ega';
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Tối ưu tải ảnh slider
    const slides = document.querySelectorAll('.slide');
    let loadedImages = 0;
    const slideImages = [];
    
    // Kiểm tra và xử lý các placeholder không tồn tại
    slides.forEach((slide, index) => {
        const placeholder = slide.querySelector('.slider-placeholder');
        if (placeholder) {
            // Lấy background-image URL
            const placeholderStyle = getComputedStyle(placeholder);
            const placeholderBgImage = placeholderStyle.backgroundImage;
            
            // Nếu URL chứa "small" nhưng ảnh không tồn tại, sử dụng ảnh chính
            if (placeholderBgImage.includes('url(') && placeholderBgImage.includes('-small')) {
                const img = new Image();
                img.onerror = function() {
                    // Ảnh thumbnail không tồn tại, sử dụng ảnh chính với filter blur
                    const mainImageSrc = slide.getAttribute('data-src');
                    placeholder.style.backgroundImage = `url('${mainImageSrc}')`;
                };
                
                // Lấy URL từ chuỗi "url(...)"
                const placeholderUrl = placeholderBgImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
                img.src = placeholderUrl;
            }
        }
    });
    
    // Tạo mảng chứa các ảnh cần preload
    slides.forEach((slide, index) => {
        const imgSrc = slide.getAttribute('data-src');
        if (imgSrc) {
            slideImages.push({
                src: imgSrc,
                element: slide
            });
        }
    });
    
    // Hàm tải ảnh ưu tiên theo thứ tự
    function loadImagesSequentially(index) {
        if (index >= slideImages.length) return;
        
        const img = new Image();
        img.onload = function() {
            // Đánh dấu ảnh đã tải xong
            slideImages[index].element.classList.add('loaded');
            loadedImages++;
            
            // Load ảnh tiếp theo sau khi ảnh hiện tại đã tải xong
            if (index + 1 < slideImages.length) {
                setTimeout(() => {
                    loadImagesSequentially(index + 1);
                }, 100);
            }
        };
        
        // Thêm sự kiện lỗi để xử lý khi ảnh không tải được
        img.onerror = function() {
            console.warn('Không thể tải ảnh: ' + slideImages[index].src);
            
            // Vẫn tiếp tục tải ảnh tiếp theo nếu có lỗi
            if (index + 1 < slideImages.length) {
                setTimeout(() => {
                    loadImagesSequentially(index + 1);
                }, 100);
            }
        };
        
        img.src = slideImages[index].src;
    }
    
    // Bắt đầu tải ảnh đầu tiên ngay lập tức, các ảnh khác sẽ tải theo thứ tự
    loadImagesSequentially(0);
    
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
