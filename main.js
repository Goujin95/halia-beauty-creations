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
  const slogan = document.querySelector('.slogan-animate');
  if (!slogan) return;

  function onScroll() {
    const rect = slogan.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      slogan.classList.add('visible');
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll);
  // Also trigger in case already in view
  onScroll();
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
