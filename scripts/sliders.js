'use strict';

export function initSlider() {
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
      slideChangeTransitionEnd() {
        this.updateAutoHeight();
      }
    },
    speed: 800,
    initialSlide: 2,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    loop: true,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true 
    },
    breakpoints: { 
      1024: { slidesPerView: 3 }
    },
  });
}
