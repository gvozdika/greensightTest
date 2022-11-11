import React from 'react';
import { useTheme, scale } from '@greensight/gds';

export interface BadgeProps {
    text: string;
}

const Badge = ({ text }: BadgeProps) => {
    const { colors } = useTheme();

    return (
        <div
            css={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: colors?.success,
                color: colors?.white,
                borderRadius: 2,
                padding: `0 ${scale(1)}px`,
                fontSize: 12,
            }}
        >
            {text}
        </div>
    );
};

export default Badge;
