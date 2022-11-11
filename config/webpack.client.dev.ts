import * as webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
    entry: ['webpack-hot-middleware/client?reload=true&noInfo=true', './src/client/index.tsx'],
    devtool: 'source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    optimization: {
        splitChunks: false,
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new CopyPlugin({ patterns: [{ from: 'public' }] })],
};

export default config;
