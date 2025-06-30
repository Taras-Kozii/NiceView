'use strict';

const openPopupButtons = document.querySelectorAll('[data-open-popup]');

export function initPopups() {
  openPopupButtons.forEach(item => {
    item.addEventListener('click', e => {
      document.querySelectorAll('dialog[open]').forEach(popup => popup.close());
      const popupDataValue = e.target.dataset.openPopup;
      const newOpenPopup = document.querySelector(`[data-popup="${popupDataValue}"]`);
      
      newOpenPopup.addEventListener('click', ev => {
        const target = ev.target;
        if (target.closest('[data-close-popup]') || !target.closest('.popup__content')) {
          setTimeout(() => {
            target.closest('[data-popup]').close();
          }, 100);
        }
      });

      setTimeout(() => {
        newOpenPopup.showModal();
      }, 100);
    });
  });
}
