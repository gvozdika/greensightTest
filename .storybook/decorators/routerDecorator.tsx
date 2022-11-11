import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

const routerDecorator: DecoratorFn = storyFn => (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path="/" component={() => storyFn()} />
    </Router>
);

export default routerDecorator;
