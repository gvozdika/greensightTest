module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:mdx/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'react-hooks'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': [2, { ignore: ['@'] }],
        'react/prop-types': 0,
        'react/display-name': 0,
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1,
        'jest/expect-expect': 0,
        'jest/valid-expect': 0,
    },
    overrides: [
        {
            files: ['*.mdx'],
            extends: ['plugin:mdx/overrides'],
        },
    ],
};
