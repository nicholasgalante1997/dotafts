import hydrate from '@/lib/hydrate';
import Home from '@/pages/Home';

hydrate(Home);

await import('lottie-web').then(({ default: lottie }) => {
  function runSplashAnimation() {
    lottie.loadAnimation({
      container: document.getElementById('splash-animation-root')!,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/dotaftr-header-animation.json',
      rendererSettings: {
        className: 'splash-animation-lottie-vector'
      }
    });
  }

  runSplashAnimation();
});
