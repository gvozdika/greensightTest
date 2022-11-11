import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer';
import ImageminWebpPlugin from 'imagemin-webp-webpack-plugin';
import imageminMozJpeg from 'imagemin-mozjpeg';
import ImageminPlugin from 'imagemin-webpack-plugin';

const config: webpack.Configuration = {
    entry: './src/client/index.tsx',
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    priority: 10,
                    enforce: true,
                },
            },
        },
        runtimeChunk: 'single',
        moduleIds: 'hashed',
    },
    performance: {
        maxEntrypointSize: 500000,
        maxAssetSize: 500000,
    },
    plugins: [
        new ImageminWebpPlugin({
            config: [
                {
                    test: /\.(jpe?g|png)$/,
                    options: {
                        quality: 80,
                        method: 6,
                    },
                },
            ],
            silent: true,
        }),
        new ImageminPlugin({
            jpegtran: null,
            optipng: null,
            gifsicle: null,
            pngquant: {
                quality: '65-90',
                speed: 1,
            },
            plugins: [
                imageminMozJpeg({
                    quality: 75,
                }),
            ],
        }),
        new CopyPlugin({ patterns: [{ from: 'public' }] }),
        new CompressionPlugin({
            test: /\.(js|css|svg)$/,
            filename: '[path].gz[query]',
            threshold: 1024,
            minRatio: 0.8,
            cache: true,
            compressionOptions: { level: 9 },
        }),
        new CompressionPlugin({
            algorithm: 'brotliCompress',
            test: /\.(js|css|svg)$/,
            filename: '[path].br[query]',
            threshold: 1024,
            minRatio: 0.8,
            cache: true,
            compressionOptions: { level: 11 },
        }),
        new BundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            openAnalyzer: false,
            generateStatsFile: true,
            logLevel: 'silent',
        }),
    ],
};

export default config;
