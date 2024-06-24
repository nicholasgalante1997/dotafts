import React from 'react';
import { AuthorLike } from '@/types/Author';

function Author(props: { author: AuthorLike }) {
  if (typeof props.author === 'string') {
    return <span className="author-string">by {props.author}</span>;
  }
  return (
    <span className="author-object">
      <span className="author-pfp" />
      {props.author.name} {props.author.email ? `<${props.author.email}>` : ''}
    </span>
  );
}

export default React.memo(Author);
