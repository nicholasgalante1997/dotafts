import lottie from 'lottie-web';

function mountHeaderAnimation() {
  var animation = lottie.loadAnimation({
    container: document.getElementById('da-header-lottie-animation-container'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'assets/dotaftr-header-animation.json',
  })
}

mountHeaderAnimation();