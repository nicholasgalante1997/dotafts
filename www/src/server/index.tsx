import React from 'react';
import { createStaticMarkup, serverLogger } from './lib';

await createStaticMarkup()
  .then(() => serverLogger.info('Wrote static assets! ✅'))
  .catch((e) => {
    serverLogger.error('An error was thrown during the execution of `createStaticMarkup()`');
    serverLogger.error(e);
    process.exit(1);
  });
