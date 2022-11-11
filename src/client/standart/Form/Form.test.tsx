import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import * as Yup from 'yup';
import Form from '.';
import FormError from './Error';
import Legend from '@standart/Legend';
import Textarea from '@standart/Textarea';
import Mask from '@standart/Mask';
import { maskPhone } from '@scripts/mask';
import { regPhone } from '@scripts/regex';

const phoneError = 'Без телефона мы не сможем отправить вам заказ';

test('label should render', () => {
    render(
        <Form
            initialValues={{
                text: '',
            }}
            validationSchema={Yup.object().shape({
                text: Yup.string().required('Текст что-то забыли'),
            })}
            onSubmit={() => undefined}
        >
            <Form.Field name="text" label="Введите текст" />
        </Form>
    );

    expect(screen.getByText('Введите текст')).toBeVisible();
});

test('should display initial value', () => {
    render(
        <Form
            initialValues={{
                textarea: 'Комментарий',
            }}
            validationSchema={Yup.object().shape({
                textarea: Yup.string(),
            })}
            onSubmit={() => undefined}
        >
            <Form.Field name="textarea" required={false}>
                <Legend name="textarea" label="Оставьте комментарий" />
                <Textarea rows={3} />
            </Form.Field>
        </Form>
    );

    expect(screen.getByText('Комментарий')).toBeVisible();
});

test('should display error', () => {
    render(
        <Form
            initialValues={{
                phone: '',
            }}
            validationSchema={Yup.object().shape({
                phone: Yup.string().matches(regPhone, 'Проверьте телефонный формат').required(phoneError),
            })}
            onSubmit={() => undefined}
        >
            <Form.Field name="phone" type="tel">
                <Legend name="phone" label="Телефон" hint="Формат: +7(000) 000-00-00" />
                <Mask mask={maskPhone} />
            </Form.Field>
            <button type="submit">Submit</button>
        </Form>
    );

    fireEvent.click(screen.getByText('Submit'));
    setTimeout(() => {
        expect(screen.getByText(phoneError)).toBeVisible();
    }, 0);
});

test('should not display error if not required', () => {
    render(
        <Form
            initialValues={{
                phone: '',
            }}
            validationSchema={Yup.object().shape({
                phone: Yup.string().matches(regPhone, 'Проверьте телефонный формат').required(phoneError),
            })}
            onSubmit={() => undefined}
        >
            <Form.Field name="phone" type="tel" required={false}>
                <Legend name="phone" label="Телефон" hint="Формат: +7(000) 000-00-00" />
                <Mask mask={maskPhone} />
            </Form.Field>
            <button type="submit">Submit</button>
        </Form>
    );

    fireEvent.click(screen.getByText('Submit'));

    setTimeout(() => {
        expect(screen.getByText(phoneError)).not.toBeVisible();
    }, 0);
});

test('render error', () => {
    render(<FormError error={phoneError}></FormError>);

    expect(screen.getByText(phoneError)).toBeVisible();
});

test('should work with not Legend component', () => {
    const TestComponent = () => <>Test</>;
    TestComponent.displayName = 'Legend';

    render(
        <Form initialValues={{}} onSubmit={() => undefined}>
            <Form.Field name="test" required={false}>
                <TestComponent></TestComponent>
            </Form.Field>
        </Form>
    );

    expect(screen.getByText('Test')).toBeVisible();
});
