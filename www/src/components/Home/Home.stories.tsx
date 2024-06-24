import '../../../public/css/splash.css';

import React, { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { pageDecoratorHOC } from '@/lib/storybook';

import Home from './Home';

const meta: Meta<typeof Home> = {
  component: Home,
  decorators: [pageDecoratorHOC],
  title: 'pages/splash',
  tags: ['autodocs', 'pages']
};

export default meta;

function HomeWithAnimation() {
  useEffect(() => {
    import('lottie-web').then(({ default: lottie }) => {
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
  }, []);
  return <Home />;
}

export const Primary: StoryObj<typeof HomeWithAnimation> = {
  render: () => <HomeWithAnimation />
};
