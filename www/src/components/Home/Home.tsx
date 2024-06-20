import React from 'react';
import Hero from './components/Hero/Hero';

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

export default React.memo(Home);
