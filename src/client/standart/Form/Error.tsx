import React from 'react';
import { useTheme, scale } from '@greensight/gds';
import ErrorIcon from '@svg/tokens/small/closedCircle.svg';
import typography from '@scripts/typography';

export interface FormErrorProps extends React.HTMLProps<HTMLDivElement> {
    /** Error text */
    error: string;
}

export const FormError = ({ error, ...props }: FormErrorProps) => {
    const { colors } = useTheme();

    return (
        <div css={{ color: colors?.danger, ...typography('bodySm') }} {...props}>
            <ErrorIcon css={{ marginRight: scale(1, true), verticalAlign: 'middle', fill: 'currentColor' }} />
            {error}
        </div>
    );
};

export default FormError;
