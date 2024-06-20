import React from 'react';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';

export function pageDecoratorHOC(Story: any) {
  return (
    <>
      <Nav />
      <main>
        <Story />
      </main>
      <Footer />
    </>
  );
}
