const publicStories = [
    '../stories/intro/welcome.stories.mdx',
    '../stories/intro/*.stories.mdx',
    '../stories/autokits/*.stories.mdx',
    '../src/client/components/**/*.stories.mdx',
];

export default {
    stories:
        process.env.STORYBOOK_INNER === 'false'
            ? publicStories
            : [...publicStories, '../src/client/standart/**/*.stories.mdx', '../stories/styleguide/*.stories.mdx'],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-a11y',
        '@storybook/addon-viewport',
        '@storybook/addon-backgrounds',
        '@storybook/addon-docs',
    ],
};
