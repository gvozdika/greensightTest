import React from 'react';
import { render, screen } from '@test-utils';
import Tabs from '.';

test('title should be in document', () => {
    const testTitle = 'Title test';
    render(
        <Tabs>
            <Tabs.List>
                <Tabs.Tab>{testTitle}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel>Panel 1</Tabs.Panel>
        </Tabs>
    );
    const testContent = screen.getByText(testTitle);
    expect(testContent).toBeInTheDocument();
});
