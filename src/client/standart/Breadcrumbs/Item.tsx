import React from 'react';
import { useTheme, scale } from '@greensight/gds';
import { Link } from 'react-router-dom';
import typography from '@scripts/typography';

export interface BreadcrumbsItemProps extends React.HTMLProps<HTMLLIElement> {
    /** Breadcrumbs item content */
    children: React.ReactNode;
    /** Link address */
    link?: string;
}

export const BreadcrumbsItem = ({ link, children, ...props }: BreadcrumbsItemProps) => {
    const { colors } = useTheme();

    return (
        <li
            css={{
                display: 'inline-block',
                ...typography('bodyBold'),
                ':not(:last-of-type)::after': {
                    content: '">"',
                    display: 'inline-block',
                    width: scale(2),
                    textAlign: 'center',
                },
            }}
            {...props}
        >
            {link ? (
                <Link to={link} css={{ ':hover': { color: colors?.brand } }}>
                    {children}
                </Link>
            ) : (
                <span>{children}</span>
            )}
        </li>
    );
};

export default BreadcrumbsItem;
