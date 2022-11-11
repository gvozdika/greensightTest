import * as React from 'react';
import { scale } from '@greensight/gds';
import Legend from '@standart/Legend';
import Checkbox from '@standart/Checkbox';
import { FieldMetaProps, FieldInputProps, FormikValues, FieldHelperProps } from 'formik';

export interface CheckboxGroupProps extends React.HTMLProps<HTMLInputElement> {
    /** Name of checkbox group (inner) */
    name?: string;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<string[]>;
    /** Label for Legend group */
    label?: string;
    /** Hint for Legend hint */
    hint?: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<string[]>;
    /** Text for indeterminate checkbox */
    indeterminate?: string;
    /** All values from Formik (inner) */
    values?: FormikValues;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string[]>;
}

export const CheckboxGroup = ({
    name,
    meta,
    label,
    hint,
    required,
    field,
    indeterminate,
    children,
    values,
    helpers,
    ...props
}: CheckboxGroupProps) => {
    delete props.css;

    const ref = React.useRef<HTMLDivElement>(null);

    const inputProps = {
        type: 'checkbox',
        name,
        id: name,
        required,
        ...props,
    };

    const [isIndeterminate, setIsIndeterminate] = React.useState(false);
    const [all, setAll] = React.useState(false);

    const clickCheckbox = () => {
        if (ref.current) {
            const childrends = Array.from(ref.current.children);
            childrends.pop();
            const states = childrends.map(child => child.querySelector('input')?.checked);
            const valLen = states.reduce((acc, item) => (item === true ? acc + 1 : acc), 0);
            const childLen = ref.current?.children.length - 1;
            setAll(valLen === childLen);

            if (indeterminate) {
                setIsIndeterminate(valLen > 0 && valLen < childLen);
            }
        }
    };

    const clickInder = () => {
        if (ref.current) {
            const childrends = Array.from(ref.current.children);
            const indeterminateChecked = childrends.pop()?.querySelector('input')?.checked || false;
            const childValues: string[] = [];
            childrends.forEach(checkbox => {
                const input = checkbox.querySelector('input');
                if (input) {
                    input.checked = indeterminateChecked;
                    if (indeterminateChecked) childValues.push(input.value);
                }
            });
            if (helpers) {
                helpers.setValue(childValues);
            }
        }
    };

    return (
        <fieldset css={{ display: 'block', position: 'relative', padding: 0 }}>
            <Legend
                as="legend"
                name={name as string}
                label={label as string}
                required={required}
                hint={hint}
                meta={meta}
            />
            <div ref={ref}>
                {children &&
                    React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                field,
                                helpers,
                                values,
                                onClick: clickCheckbox,
                                ...(index && { css: { marginTop: scale(1) } }),
                                ...inputProps,
                            });
                        }
                    })}
                {indeterminate && (
                    <Checkbox
                        value="indeterminate"
                        indeterminate={indeterminate}
                        isIndeterminate={isIndeterminate}
                        all={all}
                        {...inputProps}
                        onClick={clickInder}
                    >
                        {indeterminate}
                    </Checkbox>
                )}
            </div>
        </fieldset>
    );
};

export default CheckboxGroup;
