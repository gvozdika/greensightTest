import React from 'react';
import { useTheme, scale } from '@greensight/gds';

const Loader = (props: React.HTMLProps<HTMLDivElement>) => {
    const { colors } = useTheme();

    return (
        <div
            css={{
                width: scale(8),
                height: scale(8),
                '::after': {
                    content: '""',
                    display: 'block',
                    height: '100%',
                    border: `${scale(1, true)}px solid ${colors?.black}`,
                    borderRightColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'ring 1000ms linear infinite',
                },
                '@keyframes ring': {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
            }}
            {...props}
        />
    );
};

export default Loader;
