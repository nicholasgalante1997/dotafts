import React from 'react';

function Hero() {
  return (
    <div className="splash-animation-wrapper">
      <div id="splash-animation-root"></div>
      <p className="splash-animation-text">A place for content about content.</p>
      <div className="splash-animation-more-content">
        <button className="splash-cta">Read our Source</button>
      </div>
    </div>
  );
}

export default React.memo(Hero);
