const pages = [
  {
    ref: '@dotafts/home' as const,
    out: 'public/index.html',
    scripts: ['/dist/js/home.bundle.js', '/dist/js/web-vitals.bundle.js']
  },
  {
    ref: '@dotafts/blog/directory',
    out: 'public/blog/directory.html',
    scripts: ['/dist/js/blog-directory.bundle.js', '/dist/js/web-vitals.bundle.js']
  },
  {
    ref: '@dotafts/blog/:post',
    out: 'public/blog/post.html',
    scripts: ['/dist/js/blog-post.bundle.js', '/dist/js/web-vitals.bundle.js']
  }
];

export default pages;
