import React from 'react';
import Home from './Home';
import BlogDirectory from './BlogDirectory';

type DotAftsIndex = `@dotafts/${string}`;

const PageRegister = new Map<DotAftsIndex, React.ComponentType<any>>();
PageRegister.set('@dotafts/home', Home);
PageRegister.set('@dotafts/blog/directory', BlogDirectory);

export default Object.freeze(PageRegister);
