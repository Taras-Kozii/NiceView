'use strict';

const page = document.querySelector('.page');
const header = document.querySelector('.header');

const slider = new Swiper(".slider-gallery", {
  navigation: {
    nextEl: ".slider-gallery__next",
    prevEl: ".slider-gallery__prev" 
  },
  pagination: {
    el: '.slider-gallery__dots',
    type: 'bullets',
    clickable: true,
    dynamicBullets: false,
	},

  autoHeight: true,
  on: {
    slideChangeTransitionEnd: function () {
      this.updateAutoHeight();
    },
  },
  speed: 800,
  initialSlide: 2,
  centeredSlides: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true 
  },
  breakpoints: { 
    1024: { slidesPerView: 3 }
  },
});

const navLinks = document.querySelectorAll('[data-goto]');

if (navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      scrollToBlock(link);
    });
  });
}


















//==============================ФУНКЦІЇ================================================
function getScrollValue(link) {
  const block = document.querySelector(link.dataset.goto);
  const scrollValue = block.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  return scrollValue || 0;
}
function scrollToBlock(link) {
  const scrollValue = getScrollValue(link);
  window.scrollTo({
    behavior: "smooth",
    top: scrollValue,
  });
}


// console.log(navLinks);