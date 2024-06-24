import React from 'react';

interface LoadingIndicatorProps {
  height?: string;
  width?: string;
}

function LoadingIndicator() {
  return <div className="hypnotic" />;
}

export default React.memo(LoadingIndicator);
