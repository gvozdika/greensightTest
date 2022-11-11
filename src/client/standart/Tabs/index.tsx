import React from 'react';
import { Global } from '@emotion/core';
import cn from 'classnames';
import { useTheme, scale, typography } from '@greensight/gds';
import { Tabs as ReactTabs } from 'react-tabs';
import TabsList, { TabsListProps } from './List';
import TabsTab, { TabsTabProps } from './Tab';
import TabsPanel, { TabsPanelProps } from './Panel';

export interface TabsCompositionProps {
    List: React.FC<TabsListProps>;
    Tab: React.FC<TabsTabProps>;
    Panel: React.FC<TabsPanelProps>;
}

export interface TabsProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
    /** Tabs.List and Tabs.Panel components */
    children: React.ReactNode;
    /** Initially opened tab in uncontrolled mode */
    defaultIndex?: number;
    /** Currently opened tab in controlled mode */
    selectedIndex?: number;
    /** Tab select handler */
    onSelect?: (index: number, last: number, event: Event) => boolean | void;
}

export const Tabs: React.FC<TabsProps> & TabsCompositionProps = ({ children, className, ...props }) => {
    const { colors } = useTheme();
    const baseClass = 'tabs';
    const classes = cn(baseClass, className);

    return (
        <>
            <Global
                styles={{
                    '.tabs': {
                        '&__list': {
                            display: 'flex',
                        },

                        '&__tab': {
                            border: `1px solid ${colors?.grey400}`,
                            borderRight: 'none',
                            padding: `${scale(1, true)}px ${scale(1)}px`,
                            color: colors?.grey900,
                            backgroundColor: colors?.white,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            ...typography('bodySm'),

                            ':hover:not(&--selected):not(&--disabled)': {
                                backgroundColor: colors?.lightBlue,
                            },

                            ':last-child': {
                                borderRight: `1px solid ${colors?.grey400}`,
                                borderBottomRightRadius: `2px`,
                                borderTopRightRadius: `2px`,
                            },

                            ':first-child': {
                                borderBottomLeftRadius: `2px`,
                                borderTopLeftRadius: `2px`,
                            },

                            '&--selected': {
                                borderRadius: 'none',
                                color: colors?.white,
                                backgroundColor: colors?.primary,
                                borderColor: colors?.brand,
                            },

                            '&--disabled': {
                                color: colors?.grey600,
                                cursor: 'not-allowed',
                                backgroundColor: colors?.grey100,
                                borderColor: colors?.grey100,

                                ':not(:first-child)': {
                                    borderLeftColor: colors?.grey400,
                                },
                            },
                        },

                        '&__panel': {
                            display: 'none',
                            '&--selected': {
                                display: 'block',
                            },
                        },
                    },
                }}
            />
            <ReactTabs className={classes} {...props}>
                {children}
            </ReactTabs>
        </>
    );
};
(TabsList as any).tabsRole = 'TabList';
(TabsTab as any).tabsRole = 'Tab';
(TabsPanel as any).tabsRole = 'TabPanel';

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

export default Tabs;
