import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import { maskDateSingle } from '@scripts/mask';
import Datepicker from '.';

const getMonth = () => screen.getByRole('heading').children[0].innerHTML;

test('should open on click', () => {
    const { container } = render(<Datepicker />);
    const input = container.querySelector('input');
    input?.click();

    const dayPicker = container.querySelector('.DayPicker');

    expect(dayPicker).toBeVisible();
});

test('navigation should work', () => {
    const { container } = render(<Datepicker />);
    const input = container.querySelector('input');
    input?.click();

    const prevBtn = container.querySelector('[title="Предыдущий месяц"]');
    const nextBtn = container.querySelector('[title="Следующий месяц"]');

    const firstMonth = getMonth();
    if (nextBtn) fireEvent.click(nextBtn);
    const secondMonth = getMonth();
    expect(firstMonth === secondMonth).toBe(false);

    if (prevBtn) fireEvent.click(prevBtn);
    expect(getMonth() === firstMonth).toBe(true);
});

test('input should work', () => {
    render(<Datepicker />);

    const input = screen.getByDisplayValue('');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '22.03.2030' } });

    expect(getMonth() === 'Март 2030').toBe(true);
});

test('handle day change', () => {
    const { container } = render(<Datepicker mask={maskDateSingle} />);

    const input = screen.getByDisplayValue('');
    fireEvent.click(input);
    const day = container.querySelector('.DayPicker-Day');
    const dayValue = day?.innerHTML;
    if (day) fireEvent.click(day);

    expect(
        (dayValue?.split('').length === 1 ? '0' : '') + dayValue ===
            container.querySelector('input')?.value.substr(0, 2)
    ).toBe(true);
});

test('input should work with en locale', () => {
    render(<Datepicker locale="en" />);

    const input = screen.getByDisplayValue('');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '22.03.2030' } });

    expect(getMonth() === 'March 2030').toBe(true);
});

test('helpers should work', () => {
    let testValue: any;

    const helpers = {
        setValue: (value: Date) => {
            testValue = value;
        },
        setTouched: (): any => jest.fn(),
        setError: (): any => jest.fn(),
    };

    const { container } = render(<Datepicker helpers={helpers} />);

    const input = screen.getByDisplayValue('');
    fireEvent.click(input);
    const day = container.querySelector('.DayPicker-Day');
    if (day) fireEvent.click(day);

    expect(testValue instanceof Date).toBe(true);
});

test('helpers should handle undefined day', () => {
    let testValue: any;

    const helpers = {
        setValue: (value: Date) => {
            testValue = value;
        },
        setTouched: (): any => jest.fn(),
        setError: (): any => jest.fn(),
    };

    render(<Datepicker helpers={helpers} mask="" />);

    const input = screen.getByDisplayValue('');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '1' } });
    expect(!!testValue).toBe(false);
});

test('onDayChange should work', () => {
    let testValue: any;

    render(
        <Datepicker
            onDayChange={day => {
                testValue = day;
            }}
        />
    );

    const input = screen.getByDisplayValue('');

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '22.03.2030' } });

    expect(testValue instanceof Date).toBe(true);
});
