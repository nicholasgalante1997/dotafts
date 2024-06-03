import HTMLHeaderChunk from '../../public/htm/Header.html';

export default {
  title: 'HTML/Templates/Chunks/Header',
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
};

export const Primary = {
  render: (_args) => HTMLHeaderChunk
};
