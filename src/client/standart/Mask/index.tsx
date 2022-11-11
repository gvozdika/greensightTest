import React from 'react';
import { IMaskInput } from 'react-imask';
import { FieldHelperProps } from 'formik';
import { CSSObject } from '@emotion/core';
export interface MaskProps {
    /** Mask for input */
    mask: string;
    /** Formik helpers object (inner) */
    helpers?: FieldHelperProps<string>;
    /** Formik style object (inner) */
    css?: CSSObject;
    /** Placeholder for mask */
    placeholderChar?: string;
    /** Is show placholder */
    lazy?: boolean;
}

const Mask = ({ mask, helpers, css, placeholderChar = '_', lazy = true, ...props }: MaskProps) => {
    return (
        <IMaskInput
            mask={mask}
            {...props}
            lazy={lazy}
            placeholderChar={placeholderChar}
            onAccept={(value: string) => {
                if (helpers) helpers.setValue(value);
            }}
            css={{ ...css }}
        />
    );
};

export default Mask;
