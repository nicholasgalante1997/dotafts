import React from 'react';

import { Layout } from '@/components/Layout';
import { BlogDirectory as BlogDirComponent } from '@/components/Blog/Directory';

function BlogDirectory() {
  return (
    <Layout css={['blog-directory']} title="@Dotafts | Blog Directory" description="TODO">
      <BlogDirComponent />
    </Layout>
  );
}

export default React.memo(BlogDirectory);
