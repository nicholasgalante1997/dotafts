import React from 'react';
import Home from './Home';
import BlogDirectory from './BlogDirectory';
import BlogPost from './BlogPost';

type DotAftsIndex = `@dotafts/${string}`;

const PageRegister = new Map<DotAftsIndex, React.ComponentType<any>>();
PageRegister.set('@dotafts/home', Home);
PageRegister.set('@dotafts/blog/directory', BlogDirectory);
PageRegister.set('@dotafts/blog/:post', BlogPost);

export default Object.freeze(PageRegister);
