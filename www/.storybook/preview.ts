import '../public/css/index.css';
import '../public/css/splash.css';
import '../public/css/blog-directory.css';
import '../public/css/blog.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
