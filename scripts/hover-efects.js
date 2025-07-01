'use strict';

export function initImageTranslate() {
  const images = document.querySelectorAll(".hover-translate");

images.forEach(image => {
  image.addEventListener("mouseenter", (e) => {
    const image = e.target;
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    // Отримуємо координати картинки
    const mouseX = e.clientX - image.getBoundingClientRect().left;
    const mouseY = e.clientY - image.getBoundingClientRect().top;

    // Обчислюємо відсоткове положення миші
    const percentageX = (mouseX / imageWidth) * 100;
    const percentageY = (mouseY / imageHeight) * 100;

    image.style.transition = 'all 0.4s ease-out';
    image.style.objectPosition = `${percentageX}% ${percentageY}%`;
  });

  image.addEventListener("mouseleave", (e) => {
    const image = e.target;
    image.style.transition = 'all 0.4s ease-out';
    image.style.objectPosition = 'center center'; // повертаємо на центр при покиданні
  });
});

}