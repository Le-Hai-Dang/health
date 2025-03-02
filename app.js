document.addEventListener('DOMContentLoaded', function() {
    const joinButton = document.getElementById('joinBtn');
    const meetLink = 'https://meet.google.com/gsc-hvym-ega';

    joinButton.addEventListener('click', function() {
        window.open(meetLink, '_blank');
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
