import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { usePostData } from './hooks/usePostData';
import { PostData } from '@/types';

function Post({ children }: PostData & { children: string }) {
    return (
        <div>
            <ReactMarkdown children={children} />
        </div>
    );
}

export default React.memo(Post);