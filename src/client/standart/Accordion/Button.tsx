import React from 'react';
import { AccordionItemButton as ReactAccordionItemButton } from 'react-accessible-accordion';
import { useTheme, scale } from '@greensight/gds';
import useAccordion from './useAccordion';

export interface AccordionButtonProps extends React.HTMLProps<HTMLDivElement> {
    /** Heading content */
    children: React.ReactNode;
}

export const AccordionButton = ({ children, ...props }: AccordionButtonProps) => {
    const { Icon } = useAccordion();
    const { colors } = useTheme();

    return (
        <ReactAccordionItemButton
            css={{
                position: 'relative',
                color: colors?.black,
                backgroundColor: colors?.white,
                padding: `${scale(1)}px ${scale(3)}px`,
                cursor: 'pointer',
                transition: 'color ease 300ms, background-color ease 300ms, box-shadow ease 300ms',
                ':hover': {
                    zIndex: 1,
                    color: colors?.brand,
                },
                '&[aria-expanded="true"]': {
                    zIndex: 1,
                    color: colors?.white,
                    backgroundColor: colors?.brand,
                },
                '.js-focus-visible &.focus-visible:focus': {
                    zIndex: 1,
                    outline: 'none',
                    color: colors?.white,
                    backgroundColor: colors?.black,
                },
            }}
            {...props}
        >
            {children}
            {Icon && (
                <Icon
                    aria-hidden
                    css={{
                        position: 'absolute',
                        top: '50%',
                        right: scale(2),
                        transform: 'translateY(-50%)',
                        fill: 'currentColor',
                        transition: 'transform ease 300ms, fill ease 300ms',
                        '[aria-expanded="true"] &': {
                            transform: 'translateY(-50%) rotate(-180deg)',
                        },
                    }}
                />
            )}
        </ReactAccordionItemButton>
    );
};

export default AccordionButton;
