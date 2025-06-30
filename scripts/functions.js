'use strict';
 import { page, header } from './vars.js';

export function getScrollValue(link) {
  const block = document.querySelector(link.dataset.goto);
  const scrollValue = block.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  return scrollValue || 0;
}
export function scrollToBlock(link) {
  const scrollValue = getScrollValue(link);
  window.scrollTo({
    behavior: "smooth",
    top: scrollValue,
  });
}
export function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''))
}
export function getDigFormat(item, sepp = ' ') {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
export function lockPage() {
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
export function setCSSProperty(item, property, value) {
  item.style.setProperty(property, value);
}
