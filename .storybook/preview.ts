import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from '@scripts/theme';
import themeDecorator from '@decorators/themeDecorator';

addParameters({
    controls: { hideNoControlsWarning: true },
    options: { showRoots: true }, // https://prnt.sc/w0bnmt
    grid: { cellSize: 8 },
    viewport: { viewports: INITIAL_VIEWPORTS },
    backgrounds: { values: theme.colors && Object.entries(theme.colors).map(([name, value]) => ({ name, value })) },
});

addDecorator(themeDecorator);
addDecorator(withKnobs);
