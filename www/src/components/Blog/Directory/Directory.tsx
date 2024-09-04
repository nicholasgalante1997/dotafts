import React from 'react';
import Redirect from '@/components/Redirect/Redirect';

import PostRow from './components/PostRow';
import { usePostsData } from './hooks/usePostsData';

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
        {data && data.map((props) => <PostRow key={props.id} {...props} />)}
      </div>
    </div>
  );
}

function BlogDirectorySkeleton() {
  return <div />;
}

export default React.memo(BlogDirectory);
