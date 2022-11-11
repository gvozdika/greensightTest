import * as React from 'react';
import { FieldMetaProps, FormikValues, FieldHelperProps, FieldInputProps } from 'formik';
import { jsx } from '@emotion/core';
import { scale, useTheme } from '@greensight/gds';
import { Form } from '@standart/Form';
import { MergeElementProps } from '@scripts/utils';
import typography from '@scripts/typography';

export interface LegendBaseProps {
    /** Name for form (inner) */
    name: string;
    /** Label for Legend */
    label?: string;
    /** Flag required for forms */
    required?: boolean;
    /** Hint for legend */
    hint?: string;
    /** Formik meta object (inner) */
    meta?: FieldMetaProps<string[]>;
    /** All values from Formik */
    values?: FormikValues;
    /** Formik helpers (inner) */
    helpers?: FieldHelperProps<string[]>;
    /** Type for form */
    type?: string;
    /** Formik field object (inner) */
    field?: FieldInputProps<string[]>;
    /** Success text */
    success?: string;
}

export type LegendProps<P extends React.ElementType = 'label'> = {
    /** Use your own React component for render.*/
    as?: P;
} & MergeElementProps<P, LegendBaseProps>;

export const Legend = <T extends React.ElementType = 'label'>({
    as,
    label,
    required = true,
    hint,
    meta,
    name,
    success,
    ...props
}: LegendProps<T>) => {
    const { colors } = useTheme();

    return jsx(
        as || 'label',
        { htmlFor: name, css: { display: 'block', position: 'relative', paddingBottom: scale(1) }, ...props },
        <>
            <div>
                {label && <span css={typography('bodySmBold')}>{label}</span>}
                {!required && (
                    <span css={{ ...typography('smallSmBold'), marginLeft: scale(1, true) }}>(необязательное)</span>
                )}
            </div>
            {hint && (
                <div css={{ ...typography('bodySm'), color: colors?.grey800, marginTop: scale(1, true) }}>{hint}</div>
            )}
            {meta?.error && meta?.touched && <Form.Error error={meta?.error} css={{ marginTop: scale(1, true) }} />}
            {!meta?.error && success?.length && meta?.touched && (
                <Form.Success success={success} css={{ marginTop: scale(1, true) }} />
            )}
        </>
    );
};

export default Legend;
