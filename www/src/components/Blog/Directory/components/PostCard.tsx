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
        id,
        motifs,
        season,
        show,
        synopsis,
        title,
        media
    } = props;
    return (
        <div className="post-card__root-container">
          <div className="post-card__media-container">
          </div>
          <div className="post-card__text-container">
            <div className="post-card__title-container">
                <h1>{title}</h1>
                <Author author={author} />
            </div>
            <div className="post-card__show-container">
                <Show show={show} />
            </div>
            <div className="post-card__desc-container">
                <p className="post-card__desc">
                    {description}
                </p>
            </div>
            <div className="post-card__action-container">
                <a href={`/posts/${id}.html`}>Read More</a>
            </div>
          </div>
        </div>
    );
}

export default memo(PostCard);