import React from 'react';
import { AuthorLike } from '@/types/Author';

function Author(props: { data: AuthorLike }) {
  if (typeof props.data === 'string') {
    return <span>{props.data}</span>;
  }

  return <span>{props.data.name}</span>;
}

export default React.memo(Author);
