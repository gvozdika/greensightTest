import { resolve } from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
    /* webpack-hot-server-middleware определяет тип конфига по полю name */
    name: 'server',
    mode: isDev ? 'development' : 'production',
    target: 'node',
    externals: [
        nodeExternals({
            modulesFromFile: true,
            allowlist: [/\.css$/, /swiper\.esm$/],
        }),
    ],
    entry: { server: resolve(__dirname, '../src/server/render.tsx') },
    output: {
        path: resolve(__dirname, '../build'),
        filename: '[name].js',
        /** Делаем возможность запустить серверный бандл через require */
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'null-loader',
            },
        ],
    },
    plugins: [
        /* Для сервера игнорируем Code Splitting и оставляем один chunk */
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
};

export default config;
