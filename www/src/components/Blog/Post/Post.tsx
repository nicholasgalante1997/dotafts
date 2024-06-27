import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import toc, { Options as TOCOptions } from 'rehype-toc';

import { usePostData } from './hooks/usePostData';
import { GetPostDataPayload } from '@/loaders/posts/getPostData';

function Post() {
  const [id, setId] = useState<null | string>(null);
  const { data, error, isLoading, isPending } = usePostData(id || '', { enabled: !!id });

  useEffect(() => {
    const qps = new window.URLSearchParams(window.location.search);
    const qpid = qps.get('postIndex');
    if (qpid && id !== qpid) {
      setId(qpid);
    } else if (qpid == null && id == null) {
      window.location.assign('/500.html');
    }
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isPending) {
    return <p>Pending</p>;
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (data == null) {
    /**!
     * Handle data being null here
     */
  }

  const { attributes, body } = data as GetPostDataPayload;

  return (
    <div className="post-root-container">
      <div className="post-title-container">
        <h1>{attributes.title}</h1>
      </div>
      <div className="post-author-container">
        <div className="post-author-avatar-container">
          <img src="/assets/butters-stotch.gif" />
        </div>
        <div className="post-author-text-container">
          <b>
            {typeof attributes.author === 'string' ? attributes.author : attributes.author.name}
          </b>
          <span>
            {attributes.releaseDate}
            <i>Estimated Reading Time: {attributes.estimatedReadingTime}</i>
          </span>
        </div>
      </div>
      {attributes.media.length && (
        <div className="post-image-container">
          <img
            loading="eager"
            width="100%"
            height="auto"
            src={attributes.media[0].source}
            alt={attributes.media[0].source}
            style={{ aspectRatio: attributes.media[0].aspectRatio }}
          />
        </div>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkGemoji]}
        rehypePlugins={[rehypeSanitize, rehypeSlug, [toc, {
            position: "afterbegin",
            nav: false,
            cssClasses: {
                toc: 'post-toc'
            }
        } as TOCOptions]]}
        className="post-markdown-content-root"
        children={body}
      />
    </div>
  );
}

export default React.memo(Post);
