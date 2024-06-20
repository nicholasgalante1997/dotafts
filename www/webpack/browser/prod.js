import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

import { getEntrypoints } from './entry.js';
import { getPlugins } from './plugins.js';
import { getBrowserTarget } from './target.js';
import { getWebpackModuleResolutionRules } from './rules.js';
import { getResolve } from './resolve.js';

dotenv.config();

/** @type {(env, argv) => webpack.Configuration} */
const config = (env, argv) => ({
  mode: 'production',
  devtool: false,
  entry: getEntrypoints(),
  output: {
    clean: true,
    path: path.resolve(process.cwd(), 'public', 'dist', 'js'),
    filename: '[name].bundle.js',
    module: true,
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  },
  target: getBrowserTarget(),
  module: {
    rules: getWebpackModuleResolutionRules()
  },
  resolve: getResolve(),
  plugins: getPlugins(env)
});

export default config;
