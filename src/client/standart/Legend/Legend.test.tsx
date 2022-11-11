import React from 'react';
import { render, screen } from '@test-utils';
import Legend from '.';

const errorText = 'Произошла ошибка';
const labelText = 'Пример текста';
const hintText = 'Пример подсказки';
const notRequiredText = '(необязательное)';
const name = 'LegendTest';

test('should render correctly without a required field', () => {
    render(<Legend name={name} required={false} label={labelText} hint={hintText} />);

    const label = screen.getByText(labelText);
    const hint = screen.getByText(hintText);
    const notReqLabel = screen.getByText(notRequiredText);

    expect(label).toBeInTheDocument();
    expect(hint).toBeInTheDocument();
    expect(notReqLabel).toBeInTheDocument();
});

test('should render correctly with required field', () => {
    render(<Legend name={name} label={labelText} hint={hintText} />);

    const label = screen.getByText(labelText);
    const hint = screen.getByText(hintText);

    expect(label).toBeInTheDocument();
    expect(hint).toBeInTheDocument();
});

test('should render correctly without a hint', () => {
    render(
        <Legend
            name={name}
            label={labelText}
            meta={{ error: errorText, initialTouched: false, value: [], touched: true }}
        />
    );

    const label = screen.getByText(labelText);
    const error = screen.getByText(errorText);

    expect(label).toBeInTheDocument();
    expect(error).toBeInTheDocument();
});
