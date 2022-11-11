import React from 'react';
import cn from 'classnames';
import { TabList as ReactTabList } from 'react-tabs';

export interface TabsListProps extends React.HTMLProps<HTMLUListElement> {
    /** Tabs.Tab components */
    children: React.ReactNode;
}

export const TabsList = ({ children, className, ...props }: TabsListProps) => {
    const baseClass = 'tabs__list';
    const classes = cn(baseClass, className);

    return (
        <ReactTabList className={classes} {...props}>
            {children}
        </ReactTabList>
    );
};

export default TabsList;
