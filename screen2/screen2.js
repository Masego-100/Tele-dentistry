document.addEventListener('DOMContentLoaded', function() {
    // Font Awesome CDN
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesome);
    
    // Elements
    const resourcesOverview = document.getElementById('resources-overview');
    const videoLibrary = document.getElementById('video-library');
    const videoTutorialsCard = document.getElementById('video-tutorials-card');
    const backToResourcesLink = document.getElementById('back-to-resources');
    
    // Navigate to Video Library when clicking on Video Tutorials card
    videoTutorialsCard.addEventListener('click', function() {
        resourcesOverview.style.display = 'none';
        videoLibrary.style.display = 'block';
        window.scrollTo(0, 0); // Scroll to top when changing views
    });
    
    // Navigate back to Resources Overview when clicking on back link
    backToResourcesLink.addEventListener('click', function(e) {
        e.preventDefault();
        videoLibrary.style.display = 'none';
        resourcesOverview.style.display = 'block';
        window.scrollTo(0, 0); // Scroll to top when changing views
    });
    
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const videoCards = document.querySelectorAll('.video-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-filter');
            
            // Filter videos
            videoCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Pagination functionality (simplified version)
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('active') && item.textContent !== '...') {
                paginationItems.forEach(p => p.classList.remove('active'));
                item.classList.add('active');
                // In a real application, you would fetch new content here
                // or modify the display of the current content
            }
        });
    });
    
    // Video card click to "play" video (simulated)
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoTitle = card.querySelector('.video-title').textContent;
            console.log(`Playing video: ${videoTitle}`);
            // In a real application, you would trigger a video player here
            alert(`Playing video: ${videoTitle}\n\nIn a complete implementation, this would open a video player.`);
        });
    });
});
  
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

//SKETCHFAB VIEWER API FOR THE 3D MODELS
const iframe = document.getElementById('api-frame');
  const client = new Sketchfab('1.12.1', iframe);

  client.init('MODEL_UID_HERE', {
    success: function(api) {
      api.start(); // Starts the viewer
      api.addEventListener('viewerready', function() {
        console.log('3D model is ready!');
        // You can now add more custom API actions here
      });
    },
    error: function() {
      console.error('Sketchfab Viewer failed to load.');
    }
  });

  //Adding the UI of the 3D model viewer
  document.getElementById('3D-models-card').addEventListener('click', function() {
    fetch('screen3.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('explorer-screen').innerHTML = html;
            document.getElementById('explorer-screen').style.display = 'block';
        })
        .catch(err => console.log('Error loading explorer:', err));
});
