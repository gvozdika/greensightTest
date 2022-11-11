import React from 'react';
import BreadcrumbsItem, { BreadcrumbsItemProps } from './Item';

export interface BreadcrumbsCompositionProps {
    Item: React.FC<BreadcrumbsItemProps>;
}

export interface BreadcrumbsProps extends React.HTMLProps<HTMLDivElement> {
    /** List of Breadcrumbs.Item components */
    children: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> & BreadcrumbsCompositionProps = ({ children, ...props }) => {
    return (
        <nav aria-label="Вы находитесь здесь:" {...props}>
            <ol>{children}</ol>
        </nav>
    );
};

Breadcrumbs.Item = BreadcrumbsItem;

export default Breadcrumbs;
