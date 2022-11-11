import * as webpack from 'webpack';
import { resolve } from 'path';
import ImageminWebpPlugin from 'imagemin-webp-webpack-plugin';
import custom from '../webpack.config';

export default ({ config, mode }: { config: webpack.Configuration; mode: 'DEVELOPMENT' | 'PRODUCTION' }) => {
    const mainConfig: webpack.Configuration = custom({ isClient: true });

    if (config.module && mainConfig.module) {
        const filteredRules = config.module.rules.filter(
            rule =>
                rule.test &&
                rule.test.toString() !== /\.(mjs|jsx?)$/.toString() &&
                rule.test.toString() !==
                    /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/.toString()
        );

        const customRules = mainConfig.module.rules.filter(
            rule =>
                rule.test &&
                (rule.test.toString() === /\.svg$/.toString() ||
                    rule.test.toString() === /\.(jpe?g|png)$/.toString() ||
                    rule.test.toString() === /\.woff2?$/.toString())
        );

        config.module.rules = [
            ...(filteredRules || []),
            ...(customRules || []),
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-docgen-typescript-loader',
                        options: {
                            tsconfigPath: resolve(__dirname, '../tsconfig.json'),
                            propFilter: (prop: any) => !(prop.parent && prop.parent.fileName.includes('.yarn')),
                        },
                    },
                ],
            },
        ];
    }

    config.plugins = [
        ...(config.plugins || []),
        new webpack.EnvironmentPlugin({
            IS_CLIENT: true,
            ICONS_DIR: resolve(__dirname, '../src/client/images/icons'),
        }),
    ];

    if (mode === 'PRODUCTION') {
        config.plugins.push(
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
            })
        );
    }

    config.devtool = mode === 'DEVELOPMENT' ? 'source-map' : false;
    config.performance = false;

    if (config.resolve && mainConfig.resolve) {
        config.resolve.extensions = [
            ...new Set([...(config.resolve.extensions || []), ...(mainConfig.resolve.extensions || [])]),
        ];
        config.resolve.alias = {
            ...config.resolve.alias,
            ...mainConfig.resolve.alias,
        };
    }

    if (config.optimization) config.optimization.minimize = false;

    return config;
};
