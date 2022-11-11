import React from 'react';
import { render, fireEvent } from '@test-utils';
import Form from '@standart/Form';
import * as Yup from 'yup';
import { regOneLetter, regOneDigit } from '@scripts/regex';
import Password from '.';

interface IFormPasswordWrapper {
    children: React.ReactNode;
}

const FormPasswordWrapper = ({ children }: IFormPasswordWrapper) => {
    return (
        <Form
            initialValues={{ password: '' }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .matches(regOneLetter, 'Пароль должен содержать хотя бы 1 латинскую букву')
                    .matches(regOneDigit, 'Пароль должен содержать хотя бы 1 цифру')
                    .min(8, 'Пароль должен быть не менее 8 символов')
                    .required('Обязательное поле'),
            })}
            onSubmit={(): any => jest.fn()}
        >
            <Form.Field name="password">{children}</Form.Field>
        </Form>
    );
};

test('should change input type', () => {
    const { container } = render(
        <FormPasswordWrapper>
            <Password />
        </FormPasswordWrapper>
    );

    const input = container.querySelector('input') as any;
    const eyeButton = container.querySelector('button') as any;

    expect(input?.getAttribute('type')).toEqual('password');
    fireEvent.click(eyeButton);
    expect(input?.getAttribute('type')).toEqual('text');
    fireEvent.click(eyeButton);
    expect(input?.getAttribute('type')).toEqual('password');
});
