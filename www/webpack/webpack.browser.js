import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

dotenv.config();
console.log(JSON.stringify(process.env, null, 2));

function getEntrypoints() {
    const clientScriptsDirRoot = path.resolve(process.cwd(), 'src', 'browser');
    const dirEnts = fs.readdirSync(clientScriptsDirRoot, { encoding: 'utf-8', withFileTypes: true });
    let entryObject = {};
    for (const dirEnt of dirEnts) {
      const { parentPath, name } = dirEnt;
      const [file,] = name.split('.');
      Object.assign(entryObject, { [file.toLowerCase()]: path.resolve(parentPath, name) });
    }
    return entryObject;
}

/** @type {webpack.Configuration} */
const config = {
  mode: 'production',
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
  target: ['web', 'es2022'],
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
  plugins: [
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.ProgressPlugin()
  ]
};

export default config;
