import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import getClientSideProps from './props';
import couWorker from './worker';

function hydrate<P = {}>(Component: React.ComponentType<P>, hasProps = false) {
  let props = {} as P;
  if (hasProps) {
    props = getClientSideProps<P>();
    const propsScript = document.getElementById('@dotafts-dyn-props');
    if (propsScript) propsScript.remove();
  }
  hydrateRoot(document, <Component {...(props as P & React.JSX.IntrinsicAttributes)} />, {
    identifierPrefix: '@dotafts',
    onRecoverableError(error, errorInfo) {
      const errorWorker = couWorker('Error');
      if (errorWorker) {
        errorWorker.postMessage({ error, errorInfo });
      }
    }
  });
}

export default hydrate;
