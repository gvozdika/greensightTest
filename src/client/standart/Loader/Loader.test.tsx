import React from 'react';
import { render } from '@test-utils';
import Loader from '.';

test('should render correctly', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('div');
    expect(loader).toBeInTheDocument();
});
