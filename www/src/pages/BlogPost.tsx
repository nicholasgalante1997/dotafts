import React, { useState, useEffect } from 'react';

import { Post } from '@/components/Blog/Post';
import { usePostData } from '@/components/Blog/Post/hooks/usePostData';

function BlogPost() {
    const [id, setId] = useState<null | string>(null);
    const { data, error, isLoading, isPending } = usePostData(id || '', { enabled: !!id });
    
    useEffect(() => {
        const qps = new window.URLSearchParams(window.location.search);
        const qpid = qps.get('postIndex');
        if (qpid && id !== qpid) {
            setId(qpid);
        } else if (qpid == null && id == null) {
            window.location.assign("/500.html");
        }
    }, []);

    if (isLoading) {
        return <p>Loading</p>
    }

    if (error) {
        return <p>{JSON.stringify(error)}</p>
    }

    if (isPending) {
        return <p>Pending</p>
    }
    
    return <Post {...data as any} />
}

export default React.memo(BlogPost);
