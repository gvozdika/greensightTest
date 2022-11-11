import React from 'react';
import { AccordionItemHeading as ReactAccordionItemHeading } from 'react-accessible-accordion';

export interface AccordionHeadingProps extends React.HTMLProps<HTMLDivElement> {
    /** Accordion.Button */
    children: React.ReactNode;
    /** Heading level */
    'aria-level'?: number;
}

export const AccordionHeading = ({ children, 'aria-level': ariaLevel, ...props }: AccordionHeadingProps) => {
    return (
        <ReactAccordionItemHeading aria-level={ariaLevel} {...props}>
            {children}
        </ReactAccordionItemHeading>
    );
};

export default AccordionHeading;
