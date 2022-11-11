import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import Counter from '.';

const label = 'Выберите количество товара';
const args = {
    name: 'counter',
    initialValue: 0,
    label: label,
    min: 0,
    max: 999,
    step: 1,
};

test('label should be in document', () => {
    render(<Counter {...args} />);

    const testLabel = screen.getByText(label);
    expect(testLabel).toBeInTheDocument();
});

test('value should change with buttons', () => {
    const { container } = render(<Counter {...args} />);

    const increment = container.querySelector('[title="Увеличить на 1"]');
    const decrement = container.querySelector('[title="Уменьшить на 1"]');
    const input = container.querySelector('input');

    if (increment) fireEvent.click(increment);
    expect(input?.value).toBe('1');
    if (decrement) fireEvent.click(decrement);
    expect(input?.value).toBe('0');
});

test('value should change with input', () => {
    const { container } = render(<Counter {...args} />);
    const input = screen.getByDisplayValue('0');
    const inputElement = container.querySelector('input');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.blur(input);
    expect(inputElement?.value).toBe('2');
    fireEvent.change(input, { target: { value: '-1' } });
    fireEvent.blur(input);
    expect(inputElement?.value).toBe('0');
    fireEvent.change(input, { target: { value: '1000' } });
    fireEvent.blur(input);
    expect(inputElement?.value).toBe('999');
});

test('controlled counter', () => {
    const btnText = 'Set 5';
    const Example = () => {
        const [value, setValue] = React.useState(1);

        return (
            <>
                <button onClick={() => setValue(5)}>Set 5</button>
                <Counter
                    name="counter-controlled"
                    label={label}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    vertical={true}
                    isHiddenLegend={false}
                />
            </>
        );
    };

    const { container } = render(<Example></Example>);

    const inputElement = container.querySelector('input');
    const button = screen.getByText(btnText);
    fireEvent.click(button);
    expect(inputElement?.value).toBe('5');
});

test('should use helpers', () => {
    let testValue;

    const helpers = {
        setValue: (value: number) => {
            testValue = value;
        },
        setTouched: (): any => jest.fn(),
        setError: (): any => jest.fn(),
    };

    const { container } = render(<Counter name="counter" label={label} helpers={helpers} />);

    const increment = container.querySelector('[title="Увеличить на 1"]');

    if (increment) fireEvent.click(increment);
    expect(testValue).toBe(2);
});

test('onChange should work', () => {
    let testValue;

    const { container } = render(
        <Counter
            name="counter"
            label={label}
            onChange={() => {
                testValue = 'increment';
            }}
        />
    );

    const increment = container.querySelector('[title="Увеличить на 1"]');

    if (increment) fireEvent.click(increment);
    expect(testValue).toBe('increment');
});

test('handle incorrect input', () => {
    const { container } = render(<Counter {...args} />);
    const input = screen.getByDisplayValue('0');
    const inputElement = container.querySelector('input');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.blur(input);
    expect(inputElement?.value).toBe('0');
});
