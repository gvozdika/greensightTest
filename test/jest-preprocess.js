const babelOptions = {
    rootMode: 'upward',
    presets: [
        '@babel/preset-react',
        [
            '@babel/typescript',
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
        [
            '@babel/preset-env',
            {
                modules: 'commonjs',
                useBuiltIns: 'usage',
                corejs: 3,
                loose: true,
                targets: { node: 'current' },
            },
        ],
    ],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
