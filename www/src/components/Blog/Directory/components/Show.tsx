import React from 'react';
import { ShowEnum } from '@/types';

function getLogo(show: ShowEnum) {
  switch (show) {
    case ShowEnum.RickAndMorty:
      return 'Rick_and_Morty.svg';
  }
}

function Show({ show }: { show: ShowEnum }) {
  return (
    <div className="show-container">
      <img height="24px" width="auto" src={'/assets/logos/' + getLogo(show)} />
    </div>
  );
}

export default React.memo(Show);
