import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

dotenv.config();

/** @type {(env: any, argv) => webpack.Configuration} */
export default (env, argv) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? false : 'eval',
  entry: {
    main: path.resolve(process.cwd(), 'src', 'server', 'index.tsx'),
  },
  devServer: {
    port: 4040,
    compress: true,
    open: true,
    hot: true,
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
});