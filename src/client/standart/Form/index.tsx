import React from 'react';
import {
    Formik,
    Form as FormikForm,
    FormikFormProps,
    FormikValues,
    FormikHelpers,
    FieldInputProps,
    FieldMetaProps,
    FieldHelperProps,
} from 'formik';
import * as Yup from 'yup';
import { CSSObject } from '@emotion/core';
import FormField, { FormFieldProps } from './Field';
import FormError, { FormErrorProps } from './Error';
import FormSuccess, { FormSuccessProps } from './Success';

export interface FormCompositionProps {
    Field: React.FC<FormFieldProps>;
    Error: React.FC<FormErrorProps>;
    Success: React.FC<FormSuccessProps>;
}

export interface FormProps extends FormikFormProps, Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'ref'> {
    /** Initial formik values */
    initialValues: FormikValues;
    /** Yup validation schema */
    validationSchema?: Yup.Schema<any> | (() => Yup.Schema<any>);
    /** Formik submit handler */
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
}

export interface FormikProps<T> extends React.HTMLProps<HTMLInputElement> {
    /** `values` from `useFormikContext` */
    values: FormikValues;
    /** `field` from `useField` */
    field: FieldInputProps<T>;
    /** `meta` from `useField` */
    meta: FieldMetaProps<T>;
    /** `helpers` from `useField` */
    helpers: FieldHelperProps<T>;
    /** Field id. Equals name */
    id?: string;
    /** css object with form field styles */
    css?: CSSObject;
}

export const Form: React.FC<FormProps> & FormCompositionProps = ({
    initialValues,
    validationSchema,
    onSubmit,
    children,
    ...props
}) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {() => (
                <FormikForm noValidate {...props}>
                    {children}
                </FormikForm>
            )}
        </Formik>
    );
};

Form.Field = FormField;
Form.Error = FormError;
Form.Success = FormSuccess;

export default Form;
