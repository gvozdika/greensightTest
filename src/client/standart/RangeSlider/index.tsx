import React, { useState, CSSProperties, useEffect } from 'react';
import { FieldHelperProps, FieldInputProps } from 'formik';
import { Range, RangeProps } from 'rc-slider';
import { scale, useTheme, Layout } from '@greensight/gds';
import typography from '@scripts/typography';
import usePrevious from '@scripts/usePrevious';
import { CSSObject } from '@emotion/core';
import 'rc-slider/assets/index.css';

export interface RangeSliderProp extends RangeProps {
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string[]>;
    /** Formik field object (inner) */
    field?: FieldInputProps<string[]>;
    /** Formik style object (inner) */
    css?: CSSObject;
    /** Slider name */
    name: string;
    /** Slider value range */
    value: number[];
    /** Slider max value  */
    max: number;
    /** Slider min value  */
    min: number;
    /** Slider step  */
    step?: number;
    /** Styles for the wrapper */
    wrapStyles?: CSSObject;
    /** Additional class */
    railClassName?: string;
    /** Rail styles */
    railStylesProp?: CSSProperties;
    /** Track styles */
    trackStylesProp?: CSSProperties[];
    /** Handle styles */
    handleStylesProp?: CSSProperties;
    /** Crossing handles */
    allowCross?: boolean;
    /** On change method */
    onChange: (value: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProp> = ({
    helpers,
    field,
    css,
    name,
    value,
    max,
    min,
    step = 1,
    wrapStyles,
    railStylesProp,
    trackStylesProp,
    handleStylesProp,
    allowCross = true,
    onChange,
    ...props
}) => {
    const { colors } = useTheme();

    const railStylesBase: CSSProperties = {
        backgroundColor: colors?.grey400,
        borderRadius: 1,
    };

    const trackStylesBase: CSSProperties = {
        backgroundColor: colors?.primary,
        transform: 'translate(-100%, 100%) !imporant',
    };

    const handleStylesBase: CSSProperties = {
        backgroundColor: colors?.white,
        height: scale(2),
        width: scale(2),
        borderRadius: `50%`,
        border: `2px solid ${colors?.primary}`,
        boxShadow: 'none',
        marginTop: `-6px`,
    };

    const railStyles = railStylesProp || railStylesBase;
    const handleStyles = handleStylesProp || handleStylesBase;

    const [rangeValue, setRangeValue] = useState<number[]>(field?.value.map(Number) || value);
    const [inputValue, setInputValue] = useState<(number | string)[]>(field?.value || value);

    const prevValue = usePrevious(value);

    useEffect(() => {
        if (value !== prevValue && prevValue) {
            setRangeValue(value);
            setInputValue(value);
            if (helpers) helpers.setValue(value.map(String));
        }
    }, [value, prevValue, helpers]);

    const onChangeHandler = (values: number[]) => {
        onChange(values);
        if (helpers) helpers.setValue(values.map(String));
    };

    /** Recalculate the entered values */
    const getValue = () => {
        return inputValue.map((value, i) => {
            const numValue = Number(value);

            if (i === 0) {
                if (numValue < min) return min;

                if (
                    numValue > Number(inputValue[i + 1]) &&
                    Number(inputValue[i + 1]) > min &&
                    Number(inputValue[i + 1]) <= max
                ) {
                    return allowCross ? Number(inputValue[i + 1]) : Number(inputValue[i + 1]) - 1;
                }

                return numValue;
            }

            if (numValue > inputValue[i + 1])
                return allowCross ? Number(inputValue[i + 1]) : Number(inputValue[i + 1]) - 1;
            if (numValue > max) return max;

            if (
                numValue < Number(inputValue[i - 1]) &&
                Number(inputValue[i - 1]) >= min &&
                Number(inputValue[i - 1]) < max
            ) {
                return Number(inputValue[i + 1]) ? Number(inputValue[i - 1]) : Number(inputValue[i - 1]) + 1;
            }

            return numValue;
        });
    };

    return (
        <div css={{ ...wrapStyles }}>
            <Layout cols={value.length} gap={scale(1)} css={{ marginBottom: scale(1) }}>
                {inputValue.map((value, i) => (
                    <Layout.Item css={{ position: 'relative' }} key={i}>
                        <label
                            htmlFor={`range-slider-field-${name}-${i}`}
                            css={{
                                color: colors?.grey800,
                                position: 'absolute',
                                top: '50%',
                                left: scale(3, true),
                                transform: 'translateY(-50%)',
                                zIndex: 1,
                                paddingBottom: 0,
                                ...typography('bodySm'),
                                fontWeight: 400,
                            }}
                        >
                            {i === 0 ? 'от' : 'до'}
                        </label>
                        <input
                            type="number"
                            id={`range-slider-field-${name}-${i}`}
                            {...field}
                            value={value}
                            onChange={e => {
                                const arrValue = Array.from(inputValue);
                                arrValue[i] = e.target.value;
                                setInputValue(arrValue);
                            }}
                            onBlur={() => {
                                const values = getValue();
                                setInputValue(values.map(v => String(v).replace(/^0+/, '0')));
                                setRangeValue(values);
                                onChangeHandler(values);
                            }}
                            css={{ paddingLeft: scale(4), ...css }}
                        />
                    </Layout.Item>
                ))}
            </Layout>
            <Range
                handleStyle={Array.from({ length: value.length + 1 }, () => handleStyles)}
                trackStyle={trackStylesProp || Array.from({ length: value.length }, () => trackStylesBase)}
                railStyle={railStyles}
                min={min}
                max={max}
                step={step}
                value={rangeValue}
                onChange={values => {
                    setRangeValue(values);
                    setInputValue(values);
                    onChangeHandler(values);
                }}
                {...props}
            />
        </div>
    );
};

export default RangeSlider;
