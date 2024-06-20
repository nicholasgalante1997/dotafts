import React from 'react';

function Nav() {
  return (
    <header>
      <a href="/" target="_self" className="fira-sans-condensed-semibold blog-header-item-main">
        .aftr
      </a>
      <a
        href="/blog"
        target="_self"
        className="fira-sans-condensed-regular blog-header-item ml-auto"
      >
        Blog
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 16"
            width="18px"
            height="24px"
            fill="#fff"
            id="link-out-icon"
          >
            <path
              fillRule="evenodd"
              d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
            ></path>
          </svg>
        </span>
      </a>
      <a href="/blog" target="_self" className="fira-sans-condensed-regular blog-header-item">
        Contact Us
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 16"
            width="18px"
            height="24px"
            fill="#fff"
            id="link-out-icon"
          >
            <path
              fillRule="evenodd"
              d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
            ></path>
          </svg>
        </span>
      </a>
    </header>
  );
}

export default React.memo(Nav);
