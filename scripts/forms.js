'use strict';

export function initForms() {
  document.querySelectorAll('form').forEach(elem => {
    elem.addEventListener('submit', (e) => {
      e.preventDefault();
      if (elem.closest('[data-popup]')) {
        elem.closest('[data-popup]').close();
      }
      elem.reset();
    });
  });
}
