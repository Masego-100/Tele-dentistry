// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    // Initialize the slider
    function initSlider() {
        // Set up automatic slide change
        startSlideTimer();
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }

    // Start automatic slide timer
    function startSlideTimer() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    // Reset timer when manually navigating
    function resetTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    // Update active dot
    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        updateDots(currentSlide);
        resetTimer();
    }

    // Switch to previous slide
    function prevSlide() {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }

    // Switch to next slide
    function nextSlide() {
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    }

    // Initialize the slider
    initSlider();
});