import React from 'react';

function SplashPageContentSection() {
    return (
        <div className="splash-content-section-wrapper">
            <div className="splash-content-section-color-swatch"></div>
            <div className="splash-content-text-section">
                <h1 className="splash-content-heading">
                    Content /kənˈtɛnt/
                </h1>
            </div>
        </div>
    );
}

export default React.memo(SplashPageContentSection);
