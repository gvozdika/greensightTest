import { resolve } from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import clientBaseConfig from './config/webpack.client.base';
import clientDevConfig from './config/webpack.client.dev';
import clientProdConfig from './config/webpack.client.prod';
import serverConfig from './config/webpack.server';

const isDev = process.env.NODE_ENV === 'development';
const isMeasure = !!process.env.MEASURE;

export default ({ isClient }: { isClient?: boolean } = {}) => {
    let modeConfig;

    if (isClient) {
        modeConfig = merge(clientBaseConfig, isDev ? clientDevConfig : clientProdConfig);
    } else {
        modeConfig = serverConfig;
    }

    const smp = new SpeedMeasurePlugin({
        disable: !isMeasure,
    });

    const baseConfig: webpack.Configuration = {
        output: {
            publicPath: '/',
        },
        stats: { all: false, errors: true, warnings: true, colors: true },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
            plugins: [PnpWebpackPlugin],
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '@components': resolve(__dirname, 'src/client/components'),
                '@containers': resolve(__dirname, 'src/client/containers'),
                '@scripts': resolve(__dirname, 'src/client/scripts'),
                '@api': resolve(__dirname, 'src/client/api'),
                '@images': resolve(__dirname, 'src/client/images'),
                '@svg': resolve(__dirname, 'src/client/images/icons'),
                '@reducers': resolve(__dirname, 'src/client/reducers'),
                '@standart': resolve(__dirname, 'src/client/standart'),
                '@decorators': resolve(__dirname, '.storybook/decorators'),
            },
        },
        resolveLoader: {
            plugins: [PnpWebpackPlugin.moduleLoader(module)],
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules[\\/](?!(swiper|dom7)).*/,
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.svg$/,
                    include: resolve(__dirname, 'src/client/images/icons'),
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                        titleProp: true,
                    },
                },
                {
                    test: /\.woff2?$/,
                    include: resolve(__dirname, 'src/client/fonts'),
                    loader: 'url-loader',
                    options: {
                        name: `fonts/[name]${isDev ? '' : '.[hash:4]'}.[ext]`,
                        limit: 1024,
                        emitFile: !!isClient,
                    },
                },
                {
                    test: /\.(jpe?g|png)$/,
                    include: resolve(__dirname, 'src/client/images/simple'),
                    use: [
                        'image-trace-loader',
                        {
                            loader: 'url-loader',
                            options: {
                                name: `images/simple/[name]${isDev ? '' : '.[hash:4]'}.[ext]`,
                                limit: 1024,
                                emitFile: !!isClient,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png)$/,
                    include: resolve(__dirname, 'src/client/images/responsive'),
                    use: [
                        'image-trace-loader',
                        {
                            loader: 'responsive-loader',
                            options: {
                                outputPath: 'images/responsive',
                                name: `[name]-[width]${isDev ? '' : '.[hash:4]'}.[ext]`,
                                quality: 100,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                IS_CLIENT: !!isClient,
                ICONS_DIR: resolve(__dirname, 'src/client/images/icons'),
            }),
            new Dotenv({ defaults: true, systemvars: true, silent: true }),
        ],
    };

    return smp.wrap(merge(baseConfig, modeConfig));
};
