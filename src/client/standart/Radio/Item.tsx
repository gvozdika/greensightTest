import React from 'react';
import { FieldInputProps, FieldHelperProps, FormikValues } from 'formik';
import { useTheme, scale } from '@greensight/gds';
import typography from '@scripts/typography';

export interface RadioItemProps extends React.HTMLProps<HTMLInputElement> {
    /** Radio group name (inner) */
    name?: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<string>;
    /** Value of radio item */
    value: string;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string>;
    /** Values of Formik */
    values?: FormikValues;
}

export const RadioItem = ({ name, field, value, children, ...props }: RadioItemProps) => {
    delete props.values;
    delete props.helpers;

    const { colors } = useTheme();

    const id = `${name}-${value}`;
    const outerSize = scale(5, true);
    const innerSize = scale(1);

    return (
        <div css={{ ':not(:last-of-type)': { marginBottom: scale(1) } }}>
            <input
                {...field}
                {...props}
                type="radio"
                id={id}
                value={value}
                css={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
            />
            <label
                htmlFor={id}
                css={{
                    position: 'relative',
                    display: 'block',
                    paddingLeft: scale(4),
                    ...typography('body'),
                    color: colors?.grey900,
                    cursor: 'pointer',
                    transition: `color ease 300ms`,
                    ':hover': {
                        '::before': {
                            borderColor: colors?.primary,
                        },
                    },
                    'input:disabled + &': {
                        color: colors?.grey800,
                        cursor: 'not-allowed',
                    },
                    '::before, ::after': {
                        content: '""',
                        position: 'absolute',
                        borderRadius: '50%',
                        transition: 'transform ease 300ms',
                    },
                    '::before': {
                        top: 0,
                        left: 0,
                        width: outerSize,
                        height: outerSize,
                        border: `1px solid ${colors?.grey600}`,
                        'input:focus + &': {
                            outline: `2px solid ${colors?.black}`,
                        },
                        '.js-focus-visible input:focus:not(.focus-visible) + &': {
                            outline: 'none',
                        },
                        'input:checked + &': {
                            backgroundColor: colors?.primary,
                        },
                        'input:disabled + &': {
                            borderColor: colors?.grey400,
                            backgroundColor: colors?.grey200,
                        },
                    },
                    '::after': {
                        position: 'absolute',
                        top: outerSize / 2,
                        left: outerSize / 2,
                        width: innerSize,
                        height: innerSize,
                        backgroundColor: colors?.primary,
                        transform: 'translate(-50%, -50%) scale(0)',
                        'input:checked + &': {
                            backgroundColor: colors?.white,
                            transform: 'translate(-50%, -50%) scale(1)',
                        },
                        'input:disabled + &': {
                            backgroundColor: colors?.grey800,
                        },
                    },
                }}
            >
                {children}
            </label>
        </div>
    );
};

export default RadioItem;
