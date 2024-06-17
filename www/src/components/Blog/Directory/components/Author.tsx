import React from 'react';
import { AuthorLike } from "@/types/Author";

function Author(props: { author: AuthorLike }) {
    return (
        <span></span>
    );
}

export default React.memo(Author);
