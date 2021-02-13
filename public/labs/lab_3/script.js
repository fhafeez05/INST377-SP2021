const carouselImages = document.querySelector('.carousel_images');
const carouselButtons = document.querySelectorAll('.carousel_button');
const numberOfImages = document.querySelectorAll('.carousel_images img').length;
let imageIndex = 1;
let translateX = 0;
 
carouselButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    if (event.target.id === 'previous') {
      if (imageIndex !== 1) {
        imageIndex--;
        translateX += 300;
      }
    } elseif (imageIndex !== numberOfImages) {
            imageIndex++;
            translateX -= 300;
      }
    }
       carouselImages.style.transform = `translateX(${translateX}px)`
   });
 });