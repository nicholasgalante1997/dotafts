import React from 'react';
import { SplashPageContentSection, SplashPageHeroSection } from './components';

function Home() {
  return (
    <>
      <SplashPageHeroSection />
      <SplashPageContentSection />
    </>
  );
}

export default React.memo(Home);
