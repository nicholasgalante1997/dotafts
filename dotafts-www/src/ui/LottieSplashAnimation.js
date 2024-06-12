import lottie from 'lottie-web';

export default function runSplashAnimation() {
  lottie.loadAnimation({
    container: document.getElementById('splash-animation-root'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'assets/dotaftr-header-animation.json',
    rendererSettings: {
      className: 'splash-animation-lottie-vector'
    }
  });
}
