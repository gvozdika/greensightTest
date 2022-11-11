import React, { useState } from 'react';
import { useTheme, scale, VisuallyHidden } from '@greensight/gds';
import { FieldInputProps, FieldHelperProps } from 'formik';
import typography from '@scripts/typography';
import Star from '@svg/star.svg';

export interface RatingProps extends Omit<React.HTMLProps<HTMLFieldSetElement>, 'onChange'> {
    /** Input name */
    name: string;
    /** Input label (a11y) */
    legend: string;
    /** Default value */
    initialValue?: number;
    /** Half mode */
    isHalf?: boolean;
    /** Visually hidden legend */
    isHiddenLegend?: boolean;
    /** Custom icon */
    Icon?: SVGRIcon;
    /** Change event handler */
    onChange?: (newValue: number) => void;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<number>;
    /** Formik field object (inner) */
    field?: FieldInputProps<number>;
}

const halfStatuses = [
    'Совсем ужасно',
    'Ужасно',
    'Совсем плохо',
    'Плохо',
    'Удовлетворительно',
    'Нормально',
    'Почти хорошо',
    'Хорошо',
    'Почти отлично',
    'Отлично',
];

const fullStatuses = ['Ужасно', 'Плохо', 'Удовлетворительно', 'Хорошо', 'Отлично'];

const Rating = ({
    name,
    legend,
    initialValue = 0,
    isHalf = false,
    isHiddenLegend = true,
    Icon = Star,
    onChange,
    helpers,
    field,
    ...props
}: RatingProps) => {
    const { colors } = useTheme();

    if (!initialValue && field?.value) {
        initialValue = field.value;
    }

    const [value, setValue] = useState(initialValue);

    const changeValue = (newValue: number) => {
        setValue(newValue);
        if (onChange) onChange(newValue);
        if (helpers) helpers.setValue(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        changeValue(newValue);
    };

    const statuses = isHalf ? halfStatuses : fullStatuses;
    const iconSize = scale(4);
    const offsetSize = scale(1);

    const Legend = () => <legend css={{ marginBottom: scale(1), ...typography('body') }}>{legend}</legend>;

    return (
        <fieldset {...props}>
            {isHiddenLegend ? (
                <VisuallyHidden>
                    <Legend />
                </VisuallyHidden>
            ) : (
                <Legend />
            )}
            <div css={{ position: 'relative', fontSize: 0 }}>
                <input
                    type="radio"
                    id={`${name}-empty`}
                    name={name}
                    value="0"
                    aria-label="Без рейтинга"
                    checked={value === 0}
                    onChange={handleInputChange}
                    css={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                />
                {statuses.map((status, index) => {
                    const inputValue = isHalf ? (index + 1) / 2 : index + 1;
                    const id = `${name}-${inputValue}`;
                    const isHalvedIcon = isHalf && index % 2 === 0;
                    const labelWidth = isHalvedIcon ? iconSize / 2 : iconSize;
                    const needOffset = index && !(isHalf && index === 1);
                    return (
                        <React.Fragment key={id}>
                            <input
                                type="radio"
                                id={id}
                                name={name}
                                value={inputValue}
                                checked={inputValue === value}
                                onChange={handleInputChange}
                                css={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
                            />
                            <label
                                htmlFor={id}
                                css={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    width: needOffset ? labelWidth + offsetSize : labelWidth,
                                    ...(needOffset && { paddingLeft: offsetSize }),
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    ...(isHalvedIcon && {
                                        position: 'absolute',
                                        left: index ? (iconSize + offsetSize) * Math.floor(index / 2) - offsetSize : 0,
                                        top: 0,
                                        zIndex: 1,
                                    }),
                                    '::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: needOffset ? offsetSize : 0,
                                        width: isHalvedIcon ? iconSize / 2 : iconSize,
                                        height: iconSize,
                                        outline: `2px solid ${colors?.black}`,
                                        outlineOffset: -2,
                                        opacity: 0,
                                        '.js-focus-visible input.focus-visible:focus + &': { opacity: 1 },
                                    },
                                }}
                            >
                                <Icon
                                    css={{
                                        width: iconSize,
                                        height: iconSize,
                                        fill: inputValue <= value ? colors?.brandSecond : colors?.grey40,
                                    }}
                                />
                                <VisuallyHidden>{status}</VisuallyHidden>
                            </label>
                        </React.Fragment>
                    );
                })}
                <span
                    css={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: iconSize,
                        outline: `2px solid ${colors?.black}`,
                        outlineOffset: -2,
                        opacity: 0,
                        pointerEvents: 'none',
                        '.js-focus-visible input[value="0"].focus-visible:focus ~ &': { opacity: 1 },
                    }}
                />
            </div>
        </fieldset>
    );
};

export default Rating;
