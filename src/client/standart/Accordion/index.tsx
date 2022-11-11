import React from 'react';
import { Accordion as ReactAccordion } from 'react-accessible-accordion';
import { useTheme } from '@greensight/gds';
import { AccordionContext, AccordionContextProps } from './useAccordion';
import AccordionItem, { AccordionItemProps } from './Item';
import AccordionHeading, { AccordionHeadingProps } from './Heading';
import AccordionPanel, { AccordionPanelProps } from './Panel';
import AccordionButton, { AccordionButtonProps } from './Button';
import ArrowDownIcon from '@svg/arrow-down.svg';

export interface AccordionCompositionProps {
    Item: React.FC<AccordionItemProps>;
    Heading: React.FC<AccordionHeadingProps>;
    Panel: React.FC<AccordionPanelProps>;
    Button: React.FC<AccordionButtonProps>;
}

export interface AccordionProps
    extends AccordionContextProps,
        Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'ref'> {
    /** List of Accordion.Item components */
    children: React.ReactNode;
    /** Panel change handler */
    onChange?: (ids: string[]) => void;
    /** Allow to simultaneously open multiple panels */
    allowMultipleExpanded?: boolean;
    /** Allow to simultaneously close all panels */
    allowZeroExpanded?: boolean;
    /** List of expanded panels by default */
    preExpanded?: string[];
}

export const Accordion: React.FC<AccordionProps> & AccordionCompositionProps = ({
    children,
    allowMultipleExpanded = true,
    allowZeroExpanded = true,
    preExpanded,
    onChange,
    Icon = ArrowDownIcon,
    animationType,
    transitionTimeout = 300,
    transitionTimeoutExit = transitionTimeout,
    onEnter,
    onEntering,
    onExit,
    ...props
}) => {
    const { colors } = useTheme();

    return (
        <AccordionContext.Provider
            value={{ Icon, animationType, transitionTimeout, transitionTimeoutExit, onEnter, onEntering, onExit }}
        >
            <ReactAccordion
                allowMultipleExpanded={allowMultipleExpanded}
                allowZeroExpanded={allowZeroExpanded}
                preExpanded={preExpanded}
                onChange={onChange}
                css={{ width: '100%', border: `1px solid ${colors?.black}` }}
                {...props}
            >
                {children}
            </ReactAccordion>
        </AccordionContext.Provider>
    );
};

Accordion.Item = AccordionItem;
Accordion.Heading = AccordionHeading;
Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;

export default Accordion;
