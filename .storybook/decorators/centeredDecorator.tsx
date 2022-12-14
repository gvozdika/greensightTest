import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { scale } from '@greensight/gds';

const centeredDecorator: DecoratorFn = storyFn => (
    <div
        css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: scale(2),
        }}
    >
        {storyFn()}
    </div>
);

export default centeredDecorator;
