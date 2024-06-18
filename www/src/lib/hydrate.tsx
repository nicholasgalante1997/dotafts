import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import getClientSideProps from './props';

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
      console.warn(`
            !~ A hydration error occurred.
              error: ${JSON.stringify(error, null, 2)}
              errorInfo: ${JSON.stringify(errorInfo, null, 2)}
          `);
    }
  });
}

export default hydrate;
