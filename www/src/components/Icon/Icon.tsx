import React, { Suspense } from 'react';
import { IconProps } from './types';

const OpenIcon = React.lazy(() => import('./svgs/Open'));

function getIconByType(type: IconProps['type']) {
  switch (type) {
    case 'open':
      return OpenIcon;
  }
}

function Icon({ type, ...rest }: IconProps) {
  const TypedIcon = React.useMemo(() => getIconByType(type), [type]);
  return (
    <span>
      <Suspense fallback={false}>
        <TypedIcon {...rest} />
      </Suspense>
    </span>
  );
}

export default React.memo(Icon);
