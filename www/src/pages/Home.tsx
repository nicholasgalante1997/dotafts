import React from 'react';

import { Layout, LayoutProps } from '@/components/Layout';
import { HomeComponent } from '@/components/Home';

function HomePage(props: LayoutProps & {}) {
  return (
    <Layout {...props} css={['splash']}>
      <HomeComponent />
    </Layout>
  );
}

export default React.memo(HomePage);
