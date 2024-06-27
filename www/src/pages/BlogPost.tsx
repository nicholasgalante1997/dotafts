import React from 'react';
import { Post } from '@/components/Blog/Post';
import { Layout } from '@/components/Layout';

function BlogPost() {

    return (
        <Layout
            css={['blog']}
            title='Dotafts Post'
            description=''
        >
          <Post />
        </Layout>
    );
}

export default React.memo(BlogPost);
