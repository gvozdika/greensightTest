import React from 'react';
import { render, fireEvent } from '@test-utils';
import Form from '@standart/Form';
import * as Yup from 'yup';
import { regPhone } from '@scripts/regex';
import Mask from '.';
import { maskPhone } from '@scripts/mask';

interface IFormMaskWrapper {
    children: React.ReactNode;
    regEx: RegExp;
}

const FormMaskWrapper = ({ children, regEx }: IFormMaskWrapper) => {
    return (
        <Form
            initialValues={{ phone: '' }}
            validationSchema={Yup.object().shape({
                phone: Yup.string().matches(regEx, 'Проверьте телефонный формат').required('Обязательное поле'),
            })}
            onSubmit={(): any => jest.fn()}
        >
            <Form.Field name="phone" type="tel">
                {children}
            </Form.Field>
        </Form>
    );
};

test('should contain phone mask', () => {
    const { container } = render(
        <FormMaskWrapper regEx={regPhone}>
            <Mask mask={maskPhone} lazy={false} />
        </FormMaskWrapper>
    );

    const input = container.querySelector('#phone') as any;
    expect(input?.value).toEqual('+7(___) ___-__-__');
});

test('should contain phone lazy mask', () => {
    const { container } = render(
        <FormMaskWrapper regEx={regPhone}>
            <Mask mask={maskPhone} />
        </FormMaskWrapper>
    );

    const input = container.querySelector('#phone') as any;
    input.focus();
    fireEvent.change(input, { target: { value: '9' } });
    input.blur();
    expect(input?.value).toEqual('+7(9');
});

test('should use another placeholder char', () => {
    const { container } = render(
        <FormMaskWrapper regEx={regPhone}>
            <Mask mask={maskPhone} lazy={false} placeholderChar={'+'} helpers={undefined} />
        </FormMaskWrapper>
    );

    const input = container.querySelector('#phone') as any;
    input.focus();
    fireEvent.change(input, { target: { value: '22233' } });
    input.blur();
    expect(input?.value).toEqual('+7(222) 33+-++-++');
});

test('should use helpers object', () => {
    let maskFieldValue;
    const helpers = {
        setValue: (value: string) => {
            maskFieldValue = value;
        },
        setTouched: (): any => jest.fn(),
        setError: (): any => jest.fn(),
    };

    const { container } = render(
        <FormMaskWrapper regEx={regPhone}>
            <Mask mask={maskPhone} lazy={false} placeholderChar={'.'} helpers={helpers} />
        </FormMaskWrapper>
    );

    const input = container.querySelector('#phone') as any;
    input.focus();
    fireEvent.change(input, { target: { value: '999888' } });
    input.blur();
    expect(input?.value).toEqual('+7(999) 888-..-..');
    expect(maskFieldValue).toEqual(input?.value);
});
