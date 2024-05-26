import splashImageList from './imageList.js';

function initSplashImageSequence() {
  const splashImage = document.querySelector('img#splash-image-1');

  if (splashImage instanceof HTMLImageElement) {
    let interval;
    let index = 0;

    splashImage.addEventListener('load', () => {
      if (!interval) {
        interval = setInterval(updateImage, 300);
      }
    });

    function updateImage() {
      splashImage.src = splashImageList[index];
      if (index === splashImageList.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }

    updateImage();
  }
}

export default initSplashImageSequence;
