'use strict';

const page = document.querySelector('.page');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');


//========================================================MENU====================================================
burger.addEventListener('click', e => {
  burger.classList.toggle('active');
  menu.classList.toggle('open');
})
//================================================================================================================
//========================================================SLIDER==================================================
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
//======================================================NAVLINK==========================================================
const navLinks = document.querySelectorAll('[data-goto]');

if (navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      scrollToBlock(link);

      if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('open');
      }
    });
  });
}
//================================================================================================================
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
//================================================================================================================
//========================================================COUNTERS==================================================
document.querySelector('[data-counter]') ? window.addEventListener('load', showCountsAnim) : null;
  function showCountsAnim() {
    function initCounts(countsItems) {
      const counts = countsItems 
        ? countsItems 
        : document.querySelectorAll('[data-counter]');
        
      counts.forEach(item => countAnimate(item));
    }

    function countAnimate(count) {
      let startTimestamp = null;

      const duraction = parseInt(count.dataset.counter)
        ? parseInt(count.dataset.counter)
        : 1000;
      const startValue = parseInt(count.innerHTML);
      const startPosition = 0;

      const step = (timestamp) => {
        if(!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duraction, 1);
        count.innerHTML = Math.floor(progress * (startPosition + startValue));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetElem = entry.target;
          const countersIntems = targetElem.querySelectorAll('[data-counter]');
          if (countersIntems.length) {
            initCounts(countersIntems);
          }
        //вимикає відслідковування після спрацювання
        // observer.unobserve(targetElem);
        }
    });
  }, options);

  const countsSections = document.querySelectorAll('[data-digits]');
  countsSections.forEach(section => observer.observe(section));

}

//================================================================================================================