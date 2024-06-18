import React from 'react';
import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';

class ServerRender<Props = any> {
  constructor(
    public Component: React.ComponentType<Props>,
    public props?: Props
  ) {}

  pipeTo<W extends NodeJS.WritableStream>(writable: W, options?: RenderToPipeableStreamOptions) {
    const Component: React.ComponentType<Props> = this.Component;
    const props = this.props || ({} as Props);
    const { pipe } = renderToPipeableStream(
      <Component {...(props as React.JSX.IntrinsicAttributes & Props)} />,
      {
        ...options,
        onShellReady() {
          if (options?.onShellReady) {
            options.onShellReady();
          }
          pipe(writable);
        }
      }
    );
  }
}

export default ServerRender;
