import React from 'react';
import Home from './Home';

type DotAftsIndex = `@dotafts/${string}`;

const PageRegister = new Map<DotAftsIndex, React.ComponentType<any>>();
PageRegister.set('@dotafts/home', Home);

export default Object.freeze(PageRegister);
