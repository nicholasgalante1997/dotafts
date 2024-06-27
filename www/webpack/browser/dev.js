import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

import { getPlugins } from './plugins.js';
import { getResolve } from './resolve.js';
import { getWebpackModuleResolutionRules } from './rules.js';
import { getBrowserTarget } from './target.js';

dotenv.config();

/** @type {(env, argv) => webpack.Configuration} */
const config = (env, argv) => ({
  mode: 'development',
  devtool: 'eval',
  entry: path.resolve(process.cwd(), 'src', 'dev', 'index.tsx'),
  devServer: {
    port: 4041,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: [
      {
        directory: path.resolve(process.cwd(), 'public', 'css'),
        publicPath: '/css'
      },
      {
        directory: path.resolve(process.cwd(), 'public', 'assets'),
        publicPath: '/assets'
      },
      {
        directory: path.resolve(process.cwd(), '..', 'data', 'posts'),
        publicPath: '/api/posts'
      },
      {
        directory: path.resolve(process.cwd(), '..', 'markdown'),
        publicPath: '/markdown'
      }
    ]
  },
  target: getBrowserTarget(),
  module: {
    rules: getWebpackModuleResolutionRules()
  },
  resolve: getResolve(),
  plugins: getPlugins(env)
});

export default config;
