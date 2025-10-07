// Home Slider
let swiper = new Swiper(".home-slider", {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.ins_flex');
  const images = document.querySelectorAll('.ins_flex img');
  
  // Clone images for infinite loop effect
  function cloneImages() {
    const firstHalf = Array.from(images).slice(0, Math.ceil(images.length / 2));
    const secondHalf = Array.from(images).slice(Math.ceil(images.length / 2));
    
    firstHalf.forEach(img => {
      const clone = img.cloneNode(true);
      carousel.appendChild(clone);
    });
    
    secondHalf.forEach(img => {
      const clone = img.cloneNode(true);
      carousel.insertBefore(clone, carousel.firstChild);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-track');
  const container = document.querySelector('.carousel-container');
  
  // Clone images for seamless looping
  function cloneImages() {
    const images = carousel.querySelectorAll('img');
    const firstFew = Array.from(images).slice(0, 3);
    
    firstFew.forEach(img => {
      const clone = img.cloneNode(true);
      carousel.appendChild(clone);
    });
  }
  
  // Initialize carousel
  cloneImages();
  
  // Touch support for mobile
  let isDragging = false;
  let startX, scrollLeft;
  
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    carousel.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });
  
  container.addEventListener('touchend', () => {
    isDragging = false;
    // Resume animation after a delay
    setTimeout(() => {
      carousel.style.animationPlayState = 'running';
    }, 1000);
  });
  
  // Pause/play on mouse enter/leave (desktop)
  container.addEventListener('mouseenter', () => {
    carousel.style.animationPlayState = 'paused';
  });
  
  container.addEventListener('mouseleave', () => {
    carousel.style.animationPlayState = 'running';
  });
});
  
  // Initialize carousel
  function initCarousel() {
    cloneImages();
    carousel.classList.add('auto-scroll');
    
    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
      carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', function() {
      carousel.style.animationPlayState = 'running';
    });
  }
  
  initCarousel();
});

// Mobile menu toggle functionality
document.getElementById('menu-toggle').addEventListener('click', function() {
    // Toggle the mobile menu
    document.querySelector('.navbar').classList.toggle('active');
    
    // Change icon from bars to times when menu is open
    this.classList.toggle('fa-bars');
    this.classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navbar').classList.remove('active');
        document.getElementById('menu-toggle').classList.add('fa-bars');
        document.getElementById('menu-toggle').classList.remove('fa-times');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const toggle = document.getElementById('menu-toggle');
    
    if (!navbar.contains(event.target) && !toggle.contains(event.target) && !event.target.classList.contains('fa-bars')) {
        navbar.classList.remove('active');
        toggle.classList.add('fa-bars');
        toggle.classList.remove('fa-times');
    }
});

document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const searchIcon = document.querySelector('.nav-icons a:nth-child(1)');
  const userIcon = document.querySelector('.nav-icons a:nth-child(2)');
  const cartIcon = document.querySelector('.nav-icons a:nth-child(3)');
  const overlay = document.getElementById('popup-overlay');
  const searchPopup = document.getElementById('search-popup');
  const userPopup = document.getElementById('user-popup');
  const cartPopup = document.getElementById('cart-popup');
  const closeButtons = document.querySelectorAll('.close-popup');

  // Open popup functions
  function openPopup(popup) {
    overlay.style.display = 'block';
    popup.style.display = 'block';
  }

  // Close popup function
  function closeAllPopups() {
    overlay.style.display = 'none';
    searchPopup.style.display = 'none';
    userPopup.style.display = 'none';
    cartPopup.style.display = 'none';
  }

  // Event listeners
  searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    openPopup(searchPopup);
  });

  userIcon.addEventListener('click', function(e) {
    e.preventDefault();
    openPopup(userPopup);
  });

  cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    openPopup(cartPopup);
  });

  // Close when clicking overlay or X button
  overlay.addEventListener('click', closeAllPopups);
  closeButtons.forEach(button => {
    button.addEventListener('click', closeAllPopups);
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  });
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Update URL without reload
            history.pushState(null, null, targetId);
        }
    });
});




// Infinite scrolling for product items
const insVideo = document.querySelector(".ins_flex");
if (insVideo) {
    Array.from(insVideo.children).forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", true);
        insVideo.appendChild(duplicateNode);
    });
}

// Fixed header on scroll
$(document).ready(function(){
    // Initialize header state
    if($(window).scrollTop() > 60){
        $('.header').addClass('active');
    }

    $(window).on('scroll load', function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('active');

        // This is the fix - simplified scroll detection
        if($(window).scrollTop() > 60){
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        }

        // Section highlighting
        $('section').each(function(){
            let top = $(window).scrollTop();
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let id = $(this).attr('id');

            if(top >= offset && top < offset + height){
                $('.navbar a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });
});

// Countdown Timer Function
function updateCountdown() {
    // Set the target date (20 February 2025 10:00 AM)
    const endDate = new Date('February 20, 2025 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = endDate - now;

    // If countdown is over
    if (distance < 0) {
        document.getElementById('days').value = '0';
        document.getElementById('hours').value = '0';
        document.getElementById('minutes').value = '0';
        document.getElementById('seconds').value = '0';
        return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the input fields
    document.getElementById('days').value = days;
    document.getElementById('hours').value = hours;
    document.getElementById('minutes').value = minutes;
    document.getElementById('seconds').value = seconds;
}

// Initialize immediately and update every second
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Initialize immediately and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const nextPage = document.querySelector('.next-page');
    let currentPage = 1;

    // Handle page number clicks
    pageNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all numbers
            pageNumbers.forEach(num => num.classList.remove('active'));
            
            // Add active class to clicked number
            this.classList.add('active');
            
            // Update current page
            currentPage = parseInt(this.textContent);
            
            // Here you would typically load new content for the page
            console.log(`Loading page ${currentPage}...`);
            // loadPageContent(currentPage);
        });
    });

    // Handle next page click
    nextPage.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (currentPage < pageNumbers.length) {
            // Remove active class from all numbers
            pageNumbers.forEach(num => num.classList.remove('active'));
            
            // Increment current page
            currentPage++;
            
            // Add active class to new page
            pageNumbers[currentPage - 1].classList.add('active');
            
            // Here you would typically load new content for the page
            console.log(`Loading page ${currentPage}...`);
            // loadPageContent(currentPage);
        }
    });
});

  const bannerTitle = document.querySelector('.banner-content h1');
  setInterval(() => {
    bannerTitle.style.textShadow =
      `0 0 20px rgba(48,255,183,${Math.random()})`;
  }, 500);


    // Simple JavaScript for responsive navigation
        document.addEventListener('DOMContentLoaded', function() {
            const registrationBtn = document.querySelector('.registration-offer .btn');
            
            registrationBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Registration form will appear here!');
            });
        });