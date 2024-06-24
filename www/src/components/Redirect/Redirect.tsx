import React, { useLayoutEffect } from 'react';

interface RedirectProps {
  url: string;
}

function Redirect({ url }: RedirectProps) {
  useLayoutEffect(() => {
    window.location.assign(url);
  }, []);
  return false;
}

export default React.memo(Redirect);
