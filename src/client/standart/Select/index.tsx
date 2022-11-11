import React from 'react';
import { CSSObject } from '@emotion/core';
import { useTheme, scale } from '@greensight/gds';
import { useSelect, UseSelectState } from 'downshift';
import { FieldMetaProps, FieldHelperProps } from 'formik';
import Legend from '@standart/Legend';
import typography from '@scripts/typography';
import { Form } from '@standart/Form';
import TriangleIcon from '@svg/tokens/small/triangle.svg';

export type OnChangeProps = Partial<UseSelectState<SelectItemProps | null>> & { name: string };

export interface SelectItemProps {
    /** Select option value */
    value: string;
    /** Select option text */
    label: React.ReactNode;
}

export interface SelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    /** Input name */
    name: string;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<any>;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<any>;
    /** Label text */
    label: string;
    /** Hint text */
    hint?: string;
    /** Required field */
    required?: boolean;
    /** Options list */
    items: SelectItemProps[];
    /** Index of option selected by default */
    defaultIndex?: number;
    /** Select option value */
    value: string;
    /** Visually hidden legend */
    hiddenLegend?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Change event handler */
    onChange?: (changes: OnChangeProps) => void;
}

const Select = ({
    name,
    meta,
    helpers,
    label,
    hint,
    required = true,
    items,
    defaultIndex,
    value,
    placeholder = 'Выберите вариант...',
    onChange,
    ...props
}: SelectProps) => {
    const firstInit = React.useRef(true);

    React.useEffect(() => {
        firstInit.current = false;
    }, [firstInit]);

    const { colors } = useTheme();

    const { isOpen, selectedItem, getLabelProps, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
        items,
        itemToString: item => (item ? (typeof item.label === 'string' ? item.label : item.value) : ''),
        initialSelectedItem: defaultIndex !== undefined ? items[defaultIndex] : null,
        ...(value !== undefined ? { selectedItem: items.find(item => item.value === value) } : {}),
        onSelectedItemChange: changes => {
            if (helpers) helpers.setValue(changes.selectedItem?.value);
            if (onChange) {
                onChange({ name, ...changes });
            }
        },
        ...(firstInit.current ? { highlightedIndex: -1 } : {}),
    });

    const legendProps = {
        as: 'div',
        name,
        label,
        required,
        hint,
        meta,
    };

    const selectedOptionCSS: CSSObject = {
        backgroundColor: colors?.lightBlue,
        color: colors?.grey900,
    };

    const optionHeight = scale(3);

    return (
        <div css={{ position: 'relative' }} {...props}>
            <Legend {...legendProps} {...getLabelProps()} />
            <button
                {...getToggleButtonProps({
                    type: 'button',
                    css: {
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        minHeight: optionHeight,
                        padding: `${scale(1, true)}px ${scale(1)}px`,
                        paddingRight: 0,
                        paddingLeft: 0,
                        border: 'none',
                        borderBottom: `1px solid ${colors?.grey400}`,
                        backgroundColor: colors?.white,
                        ...typography('bodySm'),
                        ':focus': { outlineOffset: -2 },
                        ...(meta?.touched && meta?.error && { borderColor: colors?.error }),
                    },
                })}
            >
                {selectedItem ? (
                    <span css={{ display: 'flex', alignItems: 'center', color: colors?.grey900, textAlign: 'left' }}>
                        {selectedItem.label}
                    </span>
                ) : (
                    <span css={{ color: colors?.grey800 }}>{placeholder}</span>
                )}
                <span css={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', padding: `0 ${scale(1)}px` }}>
                    <TriangleIcon
                        css={{
                            fill: 'currentColor',
                            transition: 'transform ease 300ms',
                            ...(isOpen && { transform: 'rotate(180deg)' }),
                        }}
                    />
                </span>
            </button>
            <ul
                {...getMenuProps({
                    css: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        overflowY: 'auto',
                        maxHeight: optionHeight * 8,
                        backgroundColor: colors?.white,
                        zIndex: 100,
                        ...(isOpen && { border: `1px solid ${colors?.grey400}`, borderTop: 'none' }),
                        ':focus': { outlineOffset: -2 },
                    },
                })}
            >
                {isOpen &&
                    items.map((option, index) => (
                        <li
                            key={option.value}
                            {...getItemProps({
                                item: option,
                                index,
                                css: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    minHeight: optionHeight,
                                    padding: `${scale(1, true)}px ${scale(1)}px`,
                                    ...typography('bodySm'),
                                    ':focus': selectedOptionCSS,
                                    // ...(meta?.touched && meta?.error && { borderColor: colors?.error }),
                                    cursor: 'pointer',
                                    // ...((option === selectedItem || index === highlightedIndex) && selectedOptionCSS),
                                    ':hover': selectedOptionCSS,
                                },
                            })}
                        >
                            {option.label}
                        </li>
                    ))}
            </ul>
            {meta?.error && meta?.touched && <Form.Error error={meta?.error} css={{ marginTop: scale(1) }} />}
        </div>
    );
};

export default Select;
