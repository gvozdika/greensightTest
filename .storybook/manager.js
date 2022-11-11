import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';

const defaultTheme = {
    colors: {
        black: '#000000',
        grey0: '#121314',
        grey20: '#666a6f',
        grey40: '#a8adb3',
        grey60: '#d6d8db',
        grey70: '#e0e3e8',
        grey90: '#f1f2f5',
        white: '#ffffff',
        fade: 'rgba(0, 0, 0, 0.5)',
        brand: '#215bf0',
        brandHover: '#1146cc',
        brandSecond: '#ea1414',
        brandSecondHover: '#d40505',
        error: '#f14646',
        warning: '#f0b621',
        success: '#4aa253',
        tagHit: '#68c1dd',
        tagSale: '#f369a3',
        tagNew: '#b6d674',
    },
};

const { colors } = defaultTheme;

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'RWBP',
        brandImage: 'logo.svg',
        brandUrl: 'https://gitlab.com/greensight/rwbp',
        colorSecondary: colors.brand,
        appBg: colors.grey20,
        appContentBg: colors.white,
        textColor: colors.black,
        barTextColor: colors.white,
        barSelectedColor: colors.white,
        barBg: colors.grey20,
        appBorderColor: colors.brand,
    }),
});
