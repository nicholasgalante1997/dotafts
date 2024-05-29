# .aftr

> .aftr is a Vanilla ES blogging web app.

## Development Goals

- We can be scalable without a framework dependency.
- We can be scalable without a bundler.
- Our code quality will not degrade shifting away from framework paradigms and patterns (React, Next, Astro, etc).
- We reject the notion of a required "build process" for frontend applications. Ecmascript is a scripting language. Our source code ships as is, with the only modifications being due to minification.
- Defer to native html5 and css3 functionality before leveraging the js equivalent.

## Dependency Management + Installation

Dependency management without a bundler becomes two-fold in a number of senses. We could devise a manner of synchronzing the places in which our dependencies are managed, but I'd make the argument that we don't really want to do that.  

Like many normal ecmascript projects, we have a package.json serving as a manifest for our dependencies. All production and dev dependencies are recorded here, but these dependency records otherwise hold no affect over our code when it runs in the browser. For dependency satisfaction in the browser, we're using [native html importmaps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap), which allow us to configure dependency resolution for our module code when we run it in the browser. The import maps will *never* contain devDependencies, and will only contain references to module dependencies needed to run that page's specific subset of javascript. This allows us to load depedency modules as needed on a page by page basis, and is basically the html5 vanilla js equivalent of [webpack's code splitting efforts](https://webpack.js.org/guides/code-splitting/#splitchunksplugin).  
