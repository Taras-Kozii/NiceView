'use strict';

const slider = new Swiper(".slider-gallery", {
  navigation: {
    nextEl: ".slider-gallery__next",
    prevEl: ".slider-gallery__prev" 
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
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
