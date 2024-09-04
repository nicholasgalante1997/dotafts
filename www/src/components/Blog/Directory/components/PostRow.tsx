import React from 'react';
import { PostData } from '@/types';
import Author from './Author';

function toPostPage(id: string | number) {
  if (typeof window !== 'undefined') {
    window.location.assign(`/blog/post.html?postIndex=${id}&_ref=internal-blog-directory`);
  }
}

function PostRow(props: PostData) {
  return (
    <div
      className="blog-dir__post-row-container"
      onClick={() =>
        toPostPage(
          typeof props.id === 'number' ? (props.id >= 10 ? props.id : `0${props.id}`) : props.id
        )
      }
    >
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

export default React.memo(PostRow);
