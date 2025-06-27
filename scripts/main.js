'use strict';

const page = document.querySelector('.page');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu__body');
const openPopupButtons = document.querySelectorAll('[data-open-popup]');


//========================================================MENU====================================================
burger.addEventListener('click', e => {
  lockPage();
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
//======================================================NAVLINK==========================================================
const navLinks = document.querySelectorAll('[data-goto]');

if (navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      scrollToBlock(link);

      if (burger.classList.contains('active')) {
        lockPage();
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
function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''))
}
function getDigFormat(item, sepp = ' ') {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
function lockPage() {
  const rightPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
  setFixPadding(rightPaddingValue);
  page.classList.toggle('lock');

  function setFixPadding(paddingRight) {
  const fixItems = document.querySelectorAll('.right-fix-padding');

  for (const item of fixItems) {
    item.style.paddingRight = paddingRight;
  }
}
}
function isInView(elem, persent=0.3) {
  const rect = elem.getBoundingClientRect();
  const visiblePart = elem.offsetHeight * persent;
    
  return rect.bottom > 0 && rect.top < (
    window.innerHeight - visiblePart || document.documentElement.clientHeight - visiblePart);
}
function toggleAnimItems(selector='.scroll-anim', visiblePercent=0.3) {
  const animItems = document.querySelectorAll(selector);

  animItems.forEach(item => {
    if (isInView(item, visiblePercent)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  })
}
//================================================================================================================
//========================================================COUNTERS==================================================
// document.querySelector('[data-counter]') ? window.addEventListener('load', showCountsAnim) : null;
//   function showCountsAnim() {
//     function initCounts(countsItems) {
//       const counts = countsItems 
//         ? countsItems 
//         : document.querySelectorAll('[data-counter]');
        
//       counts.forEach(item => countAnimate(item));
//     }

//     function countAnimate(count) {
//       let startTimestamp = null;

//       const duraction = parseInt(count.dataset.counter)
//         ? parseInt(count.dataset.counter)
//         : 1000;
//       const startValue = parseInt(count.innerHTML);
//       const startPosition = 0;

//       const step = (timestamp) => {
//         if(!startTimestamp) startTimestamp = timestamp;
//         const progress = Math.min((timestamp - startTimestamp) / duraction, 1);
//         count.innerHTML = Math.floor(progress * (startPosition + startValue));

//         if (progress < 1) {
//           window.requestAnimationFrame(step);
//         }
//       };
//       window.requestAnimationFrame(step);
//     }

//     const options = { threshold: 0.1 };
//     const observer = new IntersectionObserver((entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const targetElem = entry.target;
//           const countersIntems = targetElem.querySelectorAll('[data-counter]');
//           if (countersIntems.length) {
//             initCounts(countersIntems);
//           }
//         //вимикає відслідковування після спрацювання
//         // observer.unobserve(targetElem);
//         }
//     });
//   }, options);

//   const countsSections = document.querySelectorAll('[data-digits]');
//   countsSections.forEach(section => observer.observe(section));

// }
//================================================================================================================
openPopupButtons.forEach(item => {
  item.addEventListener('click', e => {
    document.querySelectorAll('dialog[open]').forEach(popup => popup.close());
    const popupDataValue = e.target.dataset.openPopup;
    const newOpenPopup = document.querySelector(`[data-popup="${popupDataValue}"]`);
    newOpenPopup.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('[data-close-popup]') || !target.closest('.popup__content')) {

        setTimeout(() => {
          target.closest('[data-popup]').close();
        }, 100)
      }
    })
    setTimeout(() => {
          newOpenPopup.showModal();
    }, 100)
  })
})
//===================================================FORM=============================================================
document.querySelectorAll('form').forEach(elem => {
  elem.addEventListener('submit', (e) => {
    e.preventDefault();

    if (elem.closest('[data-popup]')) {
      elem.closest('[data-popup]').close();
      elem.reset();
    }
    elem.reset();
  })
});
//===================================================ANIM=============================================================
// window.addEventListener('scroll', (e) => {
//   toggleAnimItems('.hero .scroll-anim', 0.2);
// });
// window.addEventListener('load', (e) => {
//   toggleAnimItems('.hero .scroll-anim', 0.2);
//   toggleAnimItems('.gallery .scroll-anim', 0.3);
// });

function watcherAnim(selector = '.scroll-anim', percent = 0.1, callback = (el) => {}, once = false) {
  const animItems = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        if (once) {
          observerInstance.unobserve(entry.target);
        }
      } else {
        callback(entry.target);
      }
    });
  }, {
    root: null,
    threshold: percent,
  });

  animItems.forEach(el => {
    if (el instanceof Element) {
      observer.observe(el);
    }
  });
}

watcherAnim(
  '.hero .scroll-anim',
  0.3,
  (el) => el.classList.toggle('active'),
);
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