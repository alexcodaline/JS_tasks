const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const slides = Array.from(slider.querySelectorAll("img"));
const slideCount = slides.length;
const navigation = document.querySelector(".navigation");
let slideIndex = 0;
// touch
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
const swipePx = 50;
// event listeners click
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
// event listerns touch
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchmove", handleTouchMove);
slider.addEventListener("touchend", handleTouchEnd);

// navigation buttons
slides.forEach((_, index) => {
  const navButton = document.createElement("button");
  navButton.classList.add("nav-btn");
  navButton.addEventListener("click", () => {
    slideIndex = index;
    updateSlider();
  });
  navigation.appendChild(navButton);
});

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.transform = "scale(1)";
      slide.style.opacity = 1;
    } else {
      slide.style.transform = "scale(0.8)";
      slide.style.opacity = 0;
    }
  });

  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach((nav, index) => {
    nav.classList.toggle("activeNav", index === slideIndex);
  });
}
// handleswipe
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = true;
}

function handleTouchMove(e) {
    if (!isSwiping) return;
    touchEndX = e.changedTouches[0].screenX;
}

function handleTouchEnd() {
    if (!isSwiping) return;
    isSwiping = false;
    handleSwipeGesture();
}

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;
    if (touchEndX === 0 || Math.abs(swipeDistance) <= swipePx) {
        touchEndX = 0; 
        return; 
    }
    if (swipeDistance < 0) {
        showNextSlide();
    } else {
        showPreviousSlide();
    }
    touchEndX = 0;
}
updateSlider();
