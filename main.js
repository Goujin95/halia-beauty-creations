function showSidebar(event){
  if (event) event.preventDefault();    
  const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'flex'
    }
    function hideSidebar(event){
      if (event) event.preventDefault();
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'none'
    }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.sidebar a').forEach(function(link) {
    link.addEventListener('click', function() {
      hideSidebar();
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } 
    // else {
    //   entry.target.classList.remove('show');
    // } Turned off to not show animation everytime.
  
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slogans = document.querySelectorAll('.slogan-animate'); // Select all slogans
  if (slogans.length === 0) return;

  const sloganObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sloganObserver.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, { threshold: 0.2 }); // Triggers when 20% of the element is visible

  slogans.forEach((slogan) => sloganObserver.observe(slogan));
});
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  setTimeout(() => {
    logo.classList.add('show');
  }, 500);
});

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

// For image scroller

const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// QR modal (safe)
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instaModal");
  const img = document.getElementById("instaCode");
  const modalImg = document.getElementById("img01");
  const closeBtn = modal?.querySelector(".close");

  // If any piece is missing, do nothing (prevents errors)
  if (!modal || !img || !modalImg || !closeBtn) return;

  img.addEventListener("click", () => {
    modal.style.display = "flex"; // use flex so it centers with CSS
    modalImg.src = img.src;
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Optional: close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return; // prevents errors if button missing

  // Show button after scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// Vertical Gallery Left-Side Progress Indicator Tracking
document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".gallery-viewport");
  const progressBar = document.getElementById("galleryProgressBar");

  if (!viewport || !progressBar) return;

viewport.addEventListener("scroll", () => {
  const scrollTop = viewport.scrollTop;
  const clientHeight = viewport.clientHeight;
  const scrollHeight = viewport.scrollHeight;
  
  const totalScrollableDistance = scrollHeight - clientHeight;
  
  if (totalScrollableDistance > 0) {
    let scrollPercentage = (scrollTop / totalScrollableDistance) * 100;
    
    // Safety Threshold: If we are within 2px of the absolute bottom, top it off to 100%
    if (scrollHeight - scrollTop - clientHeight <= 2) {
      scrollPercentage = 100;
    }
    
    // Update your progress bar height property smoothly
    progressBar.style.height = `${scrollPercentage}%`;
  }
});
});

// Gallery Click-to-Enlarge Lightbox Logic
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".grid-container img");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImg) return;

  // Open full uncropped image on click
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Close when clicking the "X"
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  // Close when clicking outside the main image box
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".main-slideshow .slide");
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 4000; // Rotates frames every 4 seconds

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(nextSlide, slideInterval);
});