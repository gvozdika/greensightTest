import React, { useState } from 'react';
import { FieldInputProps, FieldHelperProps, FieldMetaProps, FormikValues } from 'formik';
import { useTheme, scale } from '@greensight/gds';
import ViewIcon from '@svg/view.svg';

export interface PasswordProps extends React.HTMLProps<HTMLInputElement> {
    /** Formik field object (inner) */
    field?: FieldInputProps<string>;
    /** Custom icon */
    Icon?: SVGRIcon;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string>;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<string>;
    /** Values of Formik */
    values?: FormikValues;
}

const Password = ({ field, Icon = ViewIcon, ...props }: PasswordProps) => {
    delete props.values;
    delete props.helpers;
    delete props.meta;

    const [isVisible, setIsVisible] = useState(false);
    const { colors } = useTheme();

    return (
        <div css={{ position: 'relative' }}>
            <input
                {...field}
                {...props}
                type={isVisible ? 'text' : 'password'}
                css={{ ...(props.css as any), paddingRight: scale(6) }}
            />
            <div
                css={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: scale(6),
                    height: '100%',
                }}
            >
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    css={{
                        width: '100%',
                        height: '100%',
                        color: isVisible ? colors?.black : colors?.grey20,
                        transition: 'fill ease 300ms',
                        ':focus': { outlineOffset: -2 },
                    }}
                >
                    <Icon title={`${isVisible ? 'Скрыть' : 'Показать'} пароль`} css={{ fill: 'currentColor' }} />
                </button>
            </div>
        </div>
    );
};

export default Password;
