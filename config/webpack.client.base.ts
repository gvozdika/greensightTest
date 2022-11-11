import { resolve } from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
    /* webpack-hot-server-middleware определяет тип конфига по полю name */
    name: 'client',
    mode: isDev ? 'development' : 'production',
    output: {
        path: resolve(__dirname, '../build'),
        filename: `scripts/[name]${isDev ? '' : '.[contenthash:4]'}.js`,
        chunkFilename: `scripts/[name].chunk${isDev ? '' : '.[contenthash:4]'}.js`,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `styles/[name]${isDev ? '' : '.[contenthash:4]'}.css`,
            chunkFilename: `styles/[name].chunk${isDev ? '' : '.[contenthash:4]'}.css`,
            ignoreOrder: true,
        }),
        new LoadablePlugin(),
    ],
};

export default config;
