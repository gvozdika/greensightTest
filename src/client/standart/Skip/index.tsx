import React from 'react';
import { scale, useTheme } from '@greensight/gds';
import typography from '@scripts/typography';

export interface SkipProps extends React.HTMLProps<HTMLAnchorElement> {
    /** Anchor link ('#example') */
    link: string;
    /** Link text */
    children: string;
}

const Skip = ({ link, children, ...props }: SkipProps) => {
    const { colors } = useTheme();

    return (
        <a
            href={link}
            css={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                padding: scale(1),
                borderBottomRightRadius: scale(1),
                ...typography('headline'),
                background: colors?.brand,
                color: colors?.white,
                zIndex: 1000,
                ':focus': { top: 0, outline: 'none' },
                ':hover': { backgroundColor: colors?.brandHover },
            }}
            {...props}
        >
            {children}
        </a>
    );
};

export default Skip;
