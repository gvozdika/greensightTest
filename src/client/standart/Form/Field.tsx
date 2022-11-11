import React from 'react';
import { useField, useFormikContext } from 'formik';
import Legend from '@standart/Legend';
import { FormikProps, Form } from '@standart/Form';
import { scale, useTheme } from '@greensight/gds';
import useFieldCSS, { FieldType } from '@scripts/useFieldCSS';
import { CSSObject } from '@emotion/core';

export interface FormFieldProps extends React.HTMLProps<HTMLInputElement> {
    /** Input name */
    name: string;
    /** Label for Legend */
    label?: string;
    /** Field style type  */
    fieldStyleType?: FieldType;
    /** success */
    success?: string;
    /** legend visible flag */
    isLegend?: boolean;
    /** hint */
    hint?: string;
    /** Icon */
    Icon?: SVGRIcon;
    /** icon styles */
    iconCss?: CSSObject;
}

export const FormField = ({
    name,
    children,
    label,
    fieldStyleType = FieldType.BASIC,
    success,
    isLegend = false,
    hint,
    Icon,
    iconCss,
    ...props
}: FormFieldProps) => {
    const { values } = useFormikContext<any[]>();
    const [field, meta, helpers] = useField(name);

    const { getFieldCSS } = useFieldCSS();

    const inputCSS = getFieldCSS(fieldStyleType);
    const { colors } = useTheme();

    const checkboxCSS: CSSObject = {
        ...(meta.touched &&
            meta.error && {
                'label::before': {
                    border: `1px solid ${colors?.error}`,
                },
            }),
    };

    const inputProps = {
        type: 'text',
        name,
        ...props,
    };

    return (
        <div css={{ width: '100%' }}>
            {children ? (
                <>
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            const isCheckbox: boolean = (child?.type as React.FC)?.name === 'Checkbox' ? true : false;
                            const formikProps: FormikProps<any> = {
                                values,
                                field,
                                meta,
                                helpers,
                                id: (child?.type as React.FC)?.displayName !== 'Legend' ? name : '',
                                ...((child?.type as React.FC)?.displayName !== 'Legend'
                                    ? { css: isCheckbox ? checkboxCSS : inputCSS }
                                    : {}),
                                ...inputProps,
                                ...child.props,
                            };
                            return (
                                <>
                                    {((isLegend && meta) || label) && (
                                        <Legend name={name} meta={meta} label={label} success={success} hint={hint} />
                                    )}
                                    {isCheckbox && meta?.error && meta?.touched && (
                                        <Form.Error error={meta?.error} css={{ marginTop: scale(1) }} />
                                    )}
                                    {React.cloneElement(child, { ...formikProps })}
                                </>
                            );
                        }
                    })}
                </>
            ) : (
                <>
                    {!children && (
                        <>
                            {((isLegend && meta) || label) && (
                                <Legend
                                    name={name}
                                    meta={!props?.disabled ? meta : undefined}
                                    label={label}
                                    success={success}
                                    hint={hint}
                                />
                            )}
                            <div
                                css={{
                                    position: 'relative',
                                }}
                            >
                                {Icon && (
                                    <Icon
                                        css={{
                                            position: 'absolute',
                                            left: scale(1),
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            ...iconCss,
                                        }}
                                    />
                                )}
                                <input
                                    id={name}
                                    {...field}
                                    {...inputProps}
                                    css={{ ...inputCSS, ...(Icon && { paddingLeft: scale(4) }) }}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default FormField;
