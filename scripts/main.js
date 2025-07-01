'use strict';

import { initSlider } from './sliders.js';
import { initNavigation } from './menu.js';
import { initPopups } from './popups.js';
import { initForms } from './forms.js';
import { initImageTranslate } from './hover-efects.js';
import { watcherAnim, watcherToggle, countAnimate } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initNavigation();
  initPopups();
  initForms();
  initImageTranslate();

  watcherToggle('.hero .scroll-anim', 0.3);
  watcherAnim('[data-counter]', 0.2, countAnimate, true);
  watcherToggle('.hero .scroll-anim', 0.3);
  watcherToggle('.section-header.scroll-anim', 0.9);
});
