import React, { memo } from 'react';
import classNames from 'classnames';
import { PostData } from '@/types';
import Author from './Author';
import Show from './Show';

interface PostCardProps extends PostData {}

function PostCard(props: PostCardProps) {
  const { author, description, episode, id, motifs, season, show, synopsis, title, media, ui } =
    props;
  return (
    <div className={classNames('post-card__root-container', ui.card.background)}>
      <div className="post-card__text-container">
        <div className="post-card__title-container">
          <h1>{title}</h1>
          <Author author={author} />
        </div>
        <div className="post-card__category-container"></div>
        <div className="post-card__desc-container">
          <p className="post-card__desc">{description}</p>
        </div>
        <div className="post-card__action-container">
          <a href={`/posts/${id}.html`}>
            <i style={{ color: '#fff' }} className="gg-arrow-top-right-r"></i>
          </a>
          <a href={`/posts/${id}.html`}>
            <i style={{ color: '#fff' }} className="gg-share"></i>
          </a>
        </div>
        <div className="post-card__show-container">
          <Show show={show} />
        </div>
      </div>
    </div>
  );
}

export default memo(PostCard);
