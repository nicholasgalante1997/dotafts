import React from 'react';
import { usePostsData } from './hooks/usePostsData';
import Redirect from '@/components/Redirect/Redirect';

import { PostData } from '@/types';

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
        {data && data.map(props => <PostRow {...props} />)}
      </div>
    </div>
  );
}

function toPostPage(id: string | number) {
  if (typeof window !== "undefined") {
    window.location.assign(`/blog/post?postIndex=${id}&_ref=internal-blog-directory`);
  }
}

function PostRow(props: PostData) {
  return (
    <div className="blog-dir__post-row-container" onClick={() => toPostPage((typeof props.id === 'number' ? props.id >= 10 ? props.id : `0${props.id}` : props.id))}>
      <div className="blog-dir__post-media-container">
        <img src={props.media[0].source} className="blog-dir__post-media" />
      </div>
      <div className="blog-dir__info-container">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <div className="blog-dir__release-info">
          <Author data={props.author} />
          &nbsp;
          <span>{Intl.DateTimeFormat('en-US').format(Date.now())}</span>
        </div>
      </div>
    </div>
  );
}

function Author(props: { data: PostData['author'] }) {
  if (typeof props.data === 'string') {
    return <span>{props.data}</span>;
  }

  return <span>{props.data.name}</span>;
}

function BlogDirectorySkeleton() {
  return <div />;
}

export default React.memo(BlogDirectory);
