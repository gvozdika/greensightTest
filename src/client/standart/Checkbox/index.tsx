import React, { useRef, useEffect } from 'react';
import { useTheme, scale } from '@greensight/gds';
import { FieldInputProps, FieldMetaProps, FieldHelperProps, FormikValues } from 'formik';
import typography from '@scripts/typography';
import CheckIcon from '@svg/check.svg';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
    /** Formik field object (inner) */
    field?: FieldInputProps<string[]>;
    /** Active state indeterminate */
    isIndeterminate?: boolean;
    /** Are all values selected for indeterminate state */
    all?: boolean;
    /** Checkbox text with indeterminate state */
    indeterminate?: string;
    /** Ref for inner input */
    innerRef?: React.Ref<HTMLInputElement>;
    /** Additional class for label */
    labelClass?: string;
    /** Additional class */
    className?: string;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<any>;
    /** Formik helpers (inner) */
    helpers?: FieldHelperProps<any>;
    /** Values of Formik */
    values?: FormikValues;
    /** Additional classes from form (inner) */
    inputClasses?: string;
}

const Checkbox = ({
    name,
    field,
    value,
    isIndeterminate = false,
    all = false,
    indeterminate,
    innerRef,
    children,
    className,
    ...props
}: CheckboxProps) => {
    delete props.helpers;
    delete props.values;
    delete props.meta;
    const css = props.css;
    delete props.css;
    const { colors } = useTheme();
    const outerSize = scale(5, true);
    const id = `${name}-${value}`;

    const _ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!indeterminate) return;
        if (_ref.current) _ref.current.indeterminate = isIndeterminate;
        if (_ref.current) _ref.current.checked = all;
    }, [_ref, all, indeterminate, isIndeterminate]);

    console.log(props);
    return (
        <div className={className} css={css}>
            <input
                {...props}
                {...field}
                type="checkbox"
                id={id}
                value={value}
                name={name}
                ref={innerRef || _ref}
                css={{
                    position: 'absolute',
                    clip: 'rect(0, 0, 0, 0)',
                }}
            />
            <label
                htmlFor={id}
                css={{
                    position: 'relative',
                    display: 'block',
                    paddingLeft: scale(4),
                    ...typography('bodySm'),
                    textAlign: 'left',
                    color: colors?.black,
                    cursor: 'pointer',
                    transition: 'color ease 300ms',
                    'input:disabled + &': {
                        color: colors?.grey600,
                        cursor: 'not-allowed',
                    },
                    '::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-2px',
                        left: 0,
                        width: outerSize,
                        height: outerSize,
                        border: `1px solid ${colors?.grey600}`,
                        borderRadius: '2px',
                        'input:focus + &': {
                            border: `1px solid ${colors?.brand}`,
                        },
                        '.js-focus-visible input:focus:not(.focus-visible) + &': {
                            outline: 'none',
                        },
                        'input:checked + &': {
                            background: colors?.primary,
                        },
                        'input:disabled + &': {
                            borderColor: colors?.grey400,
                            background: colors?.grey200,
                        },
                    },
                }}
            >
                <CheckIcon
                    css={{
                        position: 'absolute',
                        top: outerSize / 2 - 2,
                        left: outerSize / 2,
                        fill: colors?.white,
                        transform: 'translate(-50%, -50%) scale(0)',
                        transition: 'transform ease 300ms',
                        'input:checked + label &': {
                            transform: 'translate(-50%, -50%) scale(1)',
                        },
                        'input:disabled + label &': {
                            fill: colors?.black,
                        },
                    }}
                />
                {children}
            </label>
        </div>
    );
};

export default Checkbox;
