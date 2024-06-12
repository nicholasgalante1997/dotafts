import HTMLSplashPage from '../../public/htm/SplashPage.html';
import '../../public/css/splash.css';

export default {
  title: 'HTML/Templates/Pages/Splash',
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
};

export const Primary = {
  render: (_args) => HTMLSplashPage
};
