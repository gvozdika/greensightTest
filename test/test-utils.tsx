import React from 'react';
import { render } from '@testing-library/react';

const customRender = (ui: React.ReactElement) =>
    render(ui, {
        wrapper: ({ children }) => <>{children}</>,
    });

export * from '@testing-library/react';

export { customRender as render };
