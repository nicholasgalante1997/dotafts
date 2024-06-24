import React from 'react';

export type IconProps = {
  type: 'open';
} & Omit<React.HTMLProps<SVGElement>, 'ref'>;
