import React from 'react';
import { render, screen } from '@test-utils';
import LoadWrapper from '.';

const errorText = 'Произошла ошибка';
const emptyMessage = 'Пустое сообщение';
const childContent = 'Hello, world!';

test('should render loader', () => {
    const { container } = render(
        <LoadWrapper isLoading error="">
            {childContent}
        </LoadWrapper>
    );
    const loader = container.querySelector('div');
    expect(loader).toBeInTheDocument();
});

test('should render error text', () => {
    render(
        <LoadWrapper isLoading={false} error={errorText}>
            {childContent}
        </LoadWrapper>
    );

    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
});

test('should render empty message', () => {
    render(
        <LoadWrapper isLoading={false} error="" emptyMessage={emptyMessage} isEmpty>
            {childContent}
        </LoadWrapper>
    );

    const emptyMessageBlock = screen.getByText(emptyMessage);
    expect(emptyMessageBlock).toBeInTheDocument();
});

test('should render child content', () => {
    render(
        <LoadWrapper isLoading={false} error="">
            {childContent}
        </LoadWrapper>
    );

    const childContentBlock = screen.getByText(childContent);
    expect(childContentBlock).toBeInTheDocument();
});
