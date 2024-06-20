import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

import { getEntrypoints } from './browser/entry.js';
import { getPlugins } from './browser/plugins.js';

dotenv.config();

/** @type {(env, argv) => webpack.Configuration} */
const config = (env, argv) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? false : 'eval',
  entry: env.production ? getEntrypoints() : path.resolve(process.cwd(), 'src', 'dev', 'index.tsx'),
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
  target: ['web', 'es2022'],
  devServer: {
    port: 4041,
    compress: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    },
    fallback: {
      path: false,
      process: false,
      fs: false
    }
  },
  plugins: getPlugins(env)
});

export default config;
