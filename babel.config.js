const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/typescript',
        !isTest ? '@emotion/babel-preset-css-prop' : {},
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                targets: { node: 'current' },
            },
        ],
    ],
    plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@loadable/babel-plugin',
        'react-hot-loader/babel',
    ],
};
