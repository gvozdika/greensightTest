import React from 'react';
import Legend from '@standart/Legend';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { VisuallyHidden, useTheme } from '@greensight/gds';
import RadioItem, { RadioItemProps } from './Item';
import RadioAnother, { RadioAnotherProps } from './Another';

export interface RadioCompositionProps {
    Item: React.FC<RadioItemProps>;
    Another: React.FC<RadioAnotherProps>;
}

export interface RadioProps extends React.HTMLProps<HTMLInputElement> {
    /** Radio group name */
    name: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<string>;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<any>;
    /** Field legend */
    legend: string;
    /** Visually hidden legend */
    isHiddenLegend?: boolean;
    /** Required field */
    required?: boolean;
    /** Hint text */
    hint?: string;
}

export const Radio: React.FC<RadioProps> & RadioCompositionProps = ({
    name,
    field,
    meta,
    children,
    legend,
    isHiddenLegend = false,
    required = true,
    hint,
    ...props
}) => {
    const { colors } = useTheme();
    return (
        <fieldset>
            {isHiddenLegend ? (
                <VisuallyHidden>
                    <Legend as="legend" name={name} label={legend} required={required} hint={hint} meta={meta} />
                </VisuallyHidden>
            ) : (
                <Legend
                    as="legend"
                    css={{ color: colors?.grey900 }}
                    name={name}
                    label={legend}
                    required={required}
                    hint={hint}
                    meta={meta}
                />
            )}
            <div>
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            name,
                            field,
                            ...props,
                        });
                    }
                })}
            </div>
        </fieldset>
    );
};

Radio.Item = RadioItem;
Radio.Another = RadioAnother;

export default Radio;
