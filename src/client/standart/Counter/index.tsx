import React from 'react';
import { CSSObject } from '@emotion/core';
import { useTheme, scale, VisuallyHidden, Layout } from '@greensight/gds';
import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';
import Legend from '@standart/Legend';
import typography from '@scripts/typography';
import MinusIcon from '@svg/minus.svg';
import PlusIcon from '@svg/plus.svg';

export interface CounterProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    /** Input unique name. Used for name and id properties */
    name: string;
    /** Initial input value */
    initialValue?: number;
    /** Input value */
    value?: number;
    /** Label text */
    label: string;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step value */
    step?: number;
    /** Handler change event on input */
    onChange?: (value: number) => void;
    /** Visually hidden legend */
    isHiddenLegend?: boolean;
    /** Flag to change view counter */
    vertical?: boolean;
    /** Required field */
    required?: boolean;
    /** Hint text */
    hint?: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<number>;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<any>;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<number>;
}

const Counter = ({
    name,
    initialValue = 1,
    value,
    label,
    step = 1,
    min = 1,
    max = 999,
    onChange,
    isHiddenLegend = true,
    vertical = false,
    required,
    hint,
    field,
    meta,
    helpers,
    ...props
}: CounterProps) => {
    const { colors } = useTheme();
    const [innerValue, setInnerValue] = React.useState<string | number>(initialValue);

    React.useEffect(() => {
        if (value) setInnerValue(value);
    }, [value, innerValue]);

    const changeValue = (newValue: number) => {
        setInnerValue(newValue);
        if (onChange) onChange(newValue);
        if (helpers) helpers.setValue(newValue);
    };

    const handleInputBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = +target.value;
        if (newValue < min) {
            changeValue(min);
            return;
        }
        if (newValue > max) {
            changeValue(max);
            return;
        }
        changeValue(newValue);
    };

    const buttonCSS: CSSObject = {
        width: scale(5),
        height: scale(5),
        border: `1px solid ${colors?.black}`,
        ':hover': { color: colors?.brand },
        ':disabled': { color: colors?.grey20, cursor: 'not-allowed' },
        ':focus': { color: colors?.brand, outlineOffset: -2 },
    };

    const iconCSS: CSSObject = {
        verticalAlign: 'middle',
        fill: 'currentColor',
        transition: `fill ease 300ms`,
    };

    return (
        <div {...props}>
            {isHiddenLegend ? (
                <VisuallyHidden>
                    <Legend name={name} label={label} required={required} hint={hint} meta={meta} />
                </VisuallyHidden>
            ) : (
                <Legend name={name} label={label} required={required} hint={hint} meta={meta} />
            )}
            <Layout
                areas={
                    vertical
                        ? ['input button-increase', 'input button-decrease']
                        : 'button-decrease input button-increase'
                }
                gap={0}
                inline
            >
                <Layout.Item area="button-decrease">
                    <button
                        type="button"
                        onClick={() => changeValue(Number(innerValue) - step)}
                        disabled={innerValue < min + step}
                        title={`Уменьшить на ${step}`}
                        css={{ ...buttonCSS, ...(vertical && { borderTop: 'none' }) }}
                    >
                        <MinusIcon css={iconCSS} />
                    </button>
                </Layout.Item>
                <Layout.Item area="input">
                    <input
                        type="number"
                        name={name}
                        id={name}
                        {...field}
                        value={innerValue}
                        step={step}
                        onChange={({ target }) =>
                            target.value ? changeValue(Number(target.value)) : setInnerValue('')
                        }
                        onBlur={handleInputBlur}
                        onClick={({ currentTarget }) => currentTarget.select()}
                        css={{
                            width: scale(8),
                            height: vertical ? '100%' : scale(5),
                            padding: `0 ${scale(1)}px`,
                            border: `1px solid ${colors?.black}`,
                            borderLeft: 'none',
                            borderRight: 'none',
                            ...typography('body'),
                            textAlign: 'center',
                            ...(vertical && { borderLeft: `1px solid colors?.black` }),
                            ':focus': { outlineOffset: -2 },
                        }}
                    />
                </Layout.Item>
                <Layout.Item area="button-increase">
                    <button
                        type="button"
                        onClick={() => changeValue(Number(innerValue) + step)}
                        disabled={innerValue > max - step}
                        title={`Увеличить на ${step}`}
                        css={buttonCSS}
                    >
                        <PlusIcon css={iconCSS} />
                    </button>
                </Layout.Item>
            </Layout>
        </div>
    );
};

export default Counter;
