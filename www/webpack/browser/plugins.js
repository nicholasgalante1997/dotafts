import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export function getPlugins(env) {
    let plugins = [
        new webpack.ProvidePlugin({ process: 'process/browser' }),
        new webpack.EnvironmentPlugin({ ...process.env }),
        new webpack.ProgressPlugin()
    ];

    if (!env.production) {
        plugins.push(new HtmlWebpackPlugin({
            template: 'src/dev/index.html',
            inject: 'body',
            publicPath: '/',
        }))
    }

    return plugins;
}