import React from 'react';
import cn from 'classnames';
import { Tab as ReactTab } from 'react-tabs';

export interface TabsTabProps extends React.HTMLProps<HTMLLIElement> {
    /** Heading content */
    children: React.ReactNode;
    /** Disabled tab */
    disabled?: boolean;
}

export const TabsTab = ({ children, className, ...props }: TabsTabProps) => {
    const baseClass = 'tabs__tab';
    const classes = cn(baseClass, className);
    return (
        <ReactTab
            className={classes}
            selectedClassName={`${baseClass}--selected`}
            disabledClassName={`${baseClass}--disabled`}
            {...props}
        >
            {children}
        </ReactTab>
    );
};

export default TabsTab;
