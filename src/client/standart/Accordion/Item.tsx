import React from 'react';
import { AccordionItem as ReactAccordionItem } from 'react-accessible-accordion';
import { useTheme } from '@greensight/gds';

export interface AccordionItemProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    /** Accordion.Heading and Accordion.Panel */
    children: React.ReactNode;
    /** Unique panel id */
    uuid?: string;
}

export const AccordionItem = ({ children, uuid, ...props }: AccordionItemProps) => {
    const { colors } = useTheme();

    return (
        <ReactAccordionItem
            uuid={uuid}
            css={{
                ':not(:first-of-type)': {
                    borderTop: `1px solid ${colors?.black}`,
                },
            }}
            {...props}
        >
            {children}
        </ReactAccordionItem>
    );
};

export default AccordionItem;
