import React, { memo } from 'react';
import { PostData } from '@/types';
import Author from './Author';
import Show from './Show';

interface PostCardProps extends PostData {}

function PostCard(props: PostCardProps) {
    const {
        author,
        description,
        episode,
        key,
        motifs,
        season,
        show,
        synopsis,
        title
    } = props;
    return (
        <div className="post-card__root-container">
          <div className="post-card__media-container">
            <img className="post-card__media" />
          </div>
          <div className="post-card__text-container">
            <div className="post-card__title-container">
                <h1>{title}</h1>
                <Author author={author} />
            </div>
            <div className="post-card__show-container">
                <Show />
            </div>
            <div className="post-card__desc-container">
                <p className="post-card__desc">
                    {description}
                </p>
            </div>
          </div>
        </div>
    );
}

export default memo(PostCard);