import React from 'react';

import { HydrationBoundary } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { BlogDirectory as BlogDirComponent } from '@/components/Blog/Directory';

interface BlogDirectoryPageProps {
  query: {
    dehydratedState: any;
  };
}

function BlogDirectory(props: BlogDirectoryPageProps) {
  return (
    <Layout title="@Dotafts | Blog Directory" description="TODO">
      <HydrationBoundary state={props.query.dehydratedState}>
        <BlogDirComponent />
      </HydrationBoundary>
    </Layout>
  );
}

export default React.memo(BlogDirectory);