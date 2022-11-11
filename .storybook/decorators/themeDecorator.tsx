import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from '@greensight/gds';
import theme from '@scripts/theme';

const themeDecorator: DecoratorFn = storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;

export default themeDecorator;
