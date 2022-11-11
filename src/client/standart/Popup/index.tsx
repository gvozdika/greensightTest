import React, { useRef } from 'react';
import { Global, CSSObject } from '@emotion/core';
import { useTheme, scale } from '@greensight/gds';
import Modal, { Props as ReactModalProps } from 'react-modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import typography from '@scripts/typography';
import CrossIcon from '@svg/cross.svg';

export interface PopupProps extends ReactModalProps {
    /** Popup content */
    children: React.ReactNode;
    /** Add close button */
    isCloseButton?: boolean;
    /** Fullscreen mode */
    isFullscreen?: boolean;
    /** Title text */
    title?: React.ReactNode;
    /** Unique name for headings association. Set id yourself for multiple popups differing */
    id?: string;
}

const Popup = ({
    children,
    onRequestClose,
    onAfterOpen,
    closeTimeoutMS = 300,
    isCloseButton = true,
    isFullscreen = false,
    title,
    id = 'popup',
    ...props
}: PopupProps) => {
    const { colors, layout } = useTheme();

    const reactModalCSS: CSSObject = {
        '.popup-overlay': {
            position: 'fixed',
            zIndex: 1000,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${scale(5)}px 0`,
            backgroundColor: colors?.fade,
            opacity: 0,
            transition: 'opacity ease 150ms',
            ...(isFullscreen && { padding: 0 }),
            '&--after-open': { opacity: 1 },
            '&--before-close': { opacity: 0, transition: 'opacity ease 300ms' },
        },
        '.popup-content': {
            position: 'relative',
            maxHeight: '100%',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 4,
            backgroundColor: colors?.white,
            transform: 'scale(0.9)',
            transition: 'transform ease 150ms',
            ...(isFullscreen && { width: '100%', height: '100%', borderRadius: 0 }),
            '&--after-open': { transform: 'scale(1)' },
            '&--before-close': { transform: 'scale(0.9)', transition: 'transform ease 300ms' },
        },
    };

    const contentRef = useRef<HTMLElement | null>(null);

    const handleOpen = (obj?: Modal.OnAfterOpenCallbackOptions) => {
        if (contentRef.current) disableBodyScroll(contentRef.current);
        if (onAfterOpen) onAfterOpen(obj);
    };

    const handleClose = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
        if (contentRef.current) enableBodyScroll(contentRef.current);
        if (onRequestClose) onRequestClose(e);
    };

    return (
        <>
            <Global styles={reactModalCSS} />
            <Modal
                bodyOpenClassName={null}
                contentRef={node => {
                    contentRef.current = node;
                }}
                overlayClassName={{
                    base: 'popup-overlay',
                    beforeClose: 'popup-overlay--before-close',
                    afterOpen: 'popup-overlay--after-open',
                }}
                className={{
                    base: 'popup-content',
                    beforeClose: 'popup-content--before-close',
                    afterOpen: 'popup-content--after-open',
                }}
                onAfterOpen={handleOpen}
                onRequestClose={handleClose}
                aria={{ labelledby: id }}
                closeTimeoutMS={closeTimeoutMS}
                {...props}
            >
                {isCloseButton && (
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Закрыть попап"
                        css={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: scale(6),
                            height: scale(6),
                            color: colors?.black,
                            transition: 'fill ease 300ms',
                            ':hover': { color: colors?.brand },
                        }}
                    >
                        <CrossIcon css={{ fill: 'currentColor' }} />
                    </button>
                )}

                <div
                    css={{
                        maxWidth: scale(53),
                        padding: scale(4),
                        ...(layout && {
                            [`@media (max-width: ${layout?.breakpoints.md - 1}px)`]: {
                                maxWidth: scale(36),
                                padding: scale(2),
                            },
                        }),
                    }}
                >
                    {title && (
                        <div
                            id={id}
                            css={{
                                ...typography('h3'),
                                marginBottom: scale(2),
                                marginRight: scale(2),
                                ...(layout && {
                                    [`@media (max-width: ${layout?.breakpoints.md - 1}px)`]: {
                                        marginRight: scale(4),
                                    },
                                }),
                            }}
                        >
                            {title}
                        </div>
                    )}
                    {children}
                </div>
            </Modal>
        </>
    );
};

Modal.setAppElement('#root');

export default Popup;
