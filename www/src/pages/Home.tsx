import React from 'react';

import { Layout, LayoutProps } from '@/components/Layout';
import { HomeComponent } from '@/components/Home';

import useEmitPageMountedMetric from '@/hooks/useEmitPageMountedMetric';

function HomePage(props: LayoutProps & {}) {
  useEmitPageMountedMetric('SPLASH');
  return (
    <Layout {...props} css={['splash']}>
      <HomeComponent />
    </Layout>
  );
}

export default React.memo(HomePage);
