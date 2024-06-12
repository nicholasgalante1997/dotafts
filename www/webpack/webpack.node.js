import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

dotenv.config();
console.log(JSON.stringify(process.env, null, 2));

/** @type {webpack.Configuration} */
export default {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    "xng-ssg": path.resolve(process.cwd(), 'src', 'server', 'xng-ssg.tsx'),
  },
  output: {
    path: path.resolve(process.cwd(), '.temp', 'server'),
    filename: '[name].js',
    module: true,
    chunkFormat: 'module',
    clean: true
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  target: 'node',
  node: {
    global: false
  },
  plugins: [new webpack.EnvironmentPlugin({ ...process.env })]
};