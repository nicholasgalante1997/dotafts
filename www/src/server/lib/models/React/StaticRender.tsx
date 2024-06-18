import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';

import { Attempt, Log } from 'sleepydogs';

import fs from 'fs';
import path from 'path';

export interface StaticPageBuilderConfig<P = {}> {
  /**
   * The component to render to a static markup file
   */
  Component: React.ComponentType<P>;
  /**
   * The output path to write the markup file to.
   *
   * This string is passed to path.resolve relative to process.cwd(),
   *
   * ```js
   * // i.e. if the output path supplied was "dist/about.html",
   * // the resulting path would be obtained by calling
   *
   * path.resolve(process.cwd(), "dist/about.html");
   * ```
   */
  outpath: string;
  /**
   * The bundled client hydration scripts to load from the browser (if any)
   */
  readonly clientJs: string[];
  /**
   * Any static props to pass to the Component and bundle into the DOM
   */
  props?: P;
  /**
   * Delete the existing stale markup file if it exists
   */
  clobber?: boolean;
}

class StaticPageBuilder<P = {}> {
  private logger = Log.factory({ service: '@dotafts/xng/react-static', version: '0.1' });
  private Component: React.ComponentType<P>;
  private outpath: string;
  private props: P;
  private clientJs: string[];
  private clobber: boolean;

  constructor(config: StaticPageBuilderConfig) {
    const { Component, outpath, clientJs = [], clobber = false, props = {} } = config;

    this.Component = Component as React.ComponentType<P>;
    this.outpath = outpath;
    this.clientJs = clientJs;
    this.props = props as P;
    this.clobber = clobber;
  }

  async writeToFile() {
    await new Promise<void>((resolve, reject) => {
      const resolvedPath = path.resolve(process.cwd(), this.outpath);
      const fileExists = fs.existsSync(resolvedPath);

      if (this.clobber && fileExists) {
        new Attempt({
          callback: () => fs.rmSync(resolvedPath, { force: true, recursive: true }),
          immediate: true,
          retries: 3,
          onError: console.error
        });
      }

      if (!this.clobber && fileExists) {
        throw new Error(
          'File exists. If the intention is to delete the existing file, set `clobber` to true.'
        );
      }

      const parentDir = path.dirname(resolvedPath);
      const parentDirExists = fs.existsSync(parentDir);

      if (!parentDirExists) {
        new Attempt({
          callback: () => {
            fs.mkdirSync(parentDir, { recursive: true });
          },
          immediate: true,
          onError(e) {
            throw e;
          }
        });
      }

      const Component = this.Component;
      let abortController = new AbortController();
      const fsWriteStream = fs.createWriteStream(resolvedPath, {
        encoding: 'utf-8',
        flags: 'w',
        signal: abortController.signal
      });

      const { pipe } = renderToPipeableStream(
        <Component {...(this.props as P & React.JSX.IntrinsicAttributes)} />,
        {
          bootstrapModules: this.clientJs,
          onAllReady: () => {
            this.logger.info(
              `Writing static component "${this.Component.displayName || 'AnonymousComponent'}" stream to ${resolvedPath}...`
            );
            pipe(fsWriteStream);
            fsWriteStream.end();
            this.logger.info('Ok ✅');
            resolve();
          },
          onShellError: (error) => {
            this.logger.info(error);
            abortController.abort();
            reject(error);
          },
          onError: (error, errorInfo) => {
            this.logger.info(error);
            reject(error);
          }
        }
      );
    });
  }
}

export default StaticPageBuilder;
