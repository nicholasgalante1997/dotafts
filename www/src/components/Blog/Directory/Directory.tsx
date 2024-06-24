import React from 'react';
import { usePostsData } from './hooks/usePostsData';
import Redirect from '@/components/Redirect/Redirect';

import PostCard from './components/PostCard';

function BlogDirectory() {
  const { data, error, isLoading, isError } = usePostsData();

  if (isLoading) {
    return <BlogDirectorySkeleton />;
  }

  if (isError || error) {
    return <Redirect url="/400.html" />;
  }

  return (
    <div className="blog-dir__root-container">
      <h1>Posts</h1>
      <div className="blog-dir__post-card-container">
        {data && data.map((card) => <PostCard key={card.id} {...card} />)}
      </div>
    </div>
  );
}

function BlogDirectorySkeleton() {
  return <div />;
}

export default React.memo(BlogDirectory);
