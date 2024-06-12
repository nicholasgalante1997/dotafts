import React from 'react';

function Home() {
  return (
    <>
      <div className="splash-animation-wrapper">
        <div id="splash-animation-root"></div>
        <p className="splash-animation-text">A place for content about content.</p>
        <div className="splash-animation-more-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            height="32"
            width="32"
            id="splash-animation-down-arrow"
          >
            <path
              fill="#fff"
              d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="splash-text-container">
        <h1 className="mellow-yellow-text-gradient">Content</h1>
        <span id="splash-content-phonemes">/kən'tɛnt/</span>
        <p>
          A new form of digital and pseudoneuroindulgent currency that you're all already grossly
          familiar with.
        </p>
        <div className="splash-text-cta-container">
          <button id="browse-opinions" className="cta-main">
            Browse Opinions
          </button>
          <button className="cta-secondary">Content Theory</button>
        </div>
      </div>
    </>
  );
}

export default React.memo(Home);
