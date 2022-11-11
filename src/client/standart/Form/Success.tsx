import React from 'react';
import { useTheme, scale } from '@greensight/gds';
import typography from '@scripts/typography';
import SuccessIcon from '@svg/tokens/small/checkCircle.svg';

export interface FormSuccessProps extends React.HTMLProps<HTMLDivElement> {
    /** Success text */
    success: string;
}

export const FormSuccess = ({ success, ...props }: FormSuccessProps) => {
    const { colors } = useTheme();

    return (
        <div css={{ color: colors?.success, ...typography('bodySm') }} {...props}>
            <SuccessIcon css={{ marginRight: scale(1, true), verticalAlign: 'middle', fill: 'currentColor' }} />
            {success}
        </div>
    );
};

export default FormSuccess;
