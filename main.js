// Sidebar functions
function showSidebar(event) {
  if (event) event.preventDefault();    
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'flex';
}

function hideSidebar(event) {
  if (event) event.preventDefault();
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'none';
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Sidebar links
  document.querySelectorAll('.sidebar a').forEach(function(link) {
    link.addEventListener('click', function() {
      hideSidebar();
    });
  });

  // Observe hidden elements (wrapped inside DOMContentLoaded)
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  // Slogans Observer
  const slogans = document.querySelectorAll('.slogan-animate');
  if (slogans.length > 0) {
    const sloganObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          sloganObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    slogans.forEach((slogan) => sloganObserver.observe(slogan));
  }

  // Logo Animation
  const logo = document.querySelector('.logo');
  if (logo) {
    setTimeout(() => {
      logo.classList.add('show');
    }, 500);
  }
});

// Image Scroller
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  const scrollers = document.querySelectorAll(".scroller");
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerInner = scroller.querySelector(".scroller-inner");
    if (!scrollerInner) return;
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// QR Modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("instaModal");
  const img = document.getElementById("instaCode");
  const modalImg = document.getElementById("img01");
  const closeBtn = modal?.querySelector(".close");

  if (!modal || !img || !modalImg || !closeBtn) return;

  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

// Back to Top Button
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// Vertical Gallery Progress Bar
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
      if (scrollHeight - scrollTop - clientHeight <= 2) {
        scrollPercentage = 100;
      }
      progressBar.style.height = `${scrollPercentage}%`;
    }
  });
});

// Gallery Lightbox
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".grid-container img");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImg) return;

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});

// Slideshow
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".main-slideshow .slide");
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 4000;

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  setInterval(nextSlide, slideInterval);
});

// FIXED: Cross-Page Hash Scrolling Handler
function scrollToHashTarget() {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (target) {
    // 1. Force section visibility
    target.classList.remove('hidden');
    target.classList.add('show');
    target.style.display = 'block';

    // 2. Perform smooth scroll
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Trigger once DOM is ready, and re-trigger after all images/assets finish loading
document.addEventListener('DOMContentLoaded', () => {
  scrollToHashTarget();
});

window.addEventListener('load', () => {
  // Delay slightly after window load to ensure image heights are fully calculated
  setTimeout(scrollToHashTarget, 100);
});