module.exports = {
    transform: {
        '^.+\\.[tj]sx?$': '<rootDir>/test/jest-preprocess.js',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    snapshotSerializers: ['@emotion/jest/serializer'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '@test-utils': '<rootDir>/test/test-utils.tsx',
        '@scripts/(.*)': '<rootDir>/src/client/scripts/$1',
        '@standart/(.*)': '<rootDir>/src/client/standart/$1',
    },
    /* Если нужно посмотреть coverage всего RWBP */
    // collectCoverageFrom: ['<rootDir>/src/**/*.{tsx,ts,js}'],
};
