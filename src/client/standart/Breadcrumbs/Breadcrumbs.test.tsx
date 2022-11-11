import React from 'react';
import { render, screen } from '@test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Breadcrumbs from '.';

test('should render correctly', () => {
    render(
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
            <Breadcrumbs>
                <Breadcrumbs.Item link="/">Title</Breadcrumbs.Item>
                <Breadcrumbs.Item>Basic</Breadcrumbs.Item>
            </Breadcrumbs>
        </Router>
    );

    const title = screen.getByText('Title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('href', '/');
});
