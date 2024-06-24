import React from 'react';
import DotaftsHref from '@/lib/models/Href';
import Icon from '../Icon/Icon';

function Nav() {
  return (
    <header>
      <a
        href={DotaftsHref.Home}
        target="_self"
        className="fira-sans-condensed-semibold blog-header-item-main"
      >
        .aftr
      </a>
      <a
        href={DotaftsHref.BlogDirectoryPage}
        target="_self"
        className="fira-sans-condensed-regular blog-header-item ml-auto"
      >
        Blog
        <Icon type="open" height="16px" width="16x" />
      </a>
      <a href="/blog" target="_self" className="fira-sans-condensed-regular blog-header-item">
        Contact Us
        <Icon type="open" height="16px" width="16x" />
      </a>
    </header>
  );
}

export default React.memo(Nav);
