import React from 'react';
import { Global } from '@emotion/core';
import { useTheme } from '@greensight/gds';
import Tippy, { TippyProps } from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

const Tooltip = ({
    children,
    theme = 'default',
    arrow = false,
    ignoreAttributes = true,
    interactive = true,
    aria = null,
    appendTo = 'parent',
    onMount,
    onHide,
    onTrigger,
    ...props
}: TippyProps) => {
    const { colors } = useTheme();

    const handleMount = (instance: any) => {
        instance.reference.setAttribute('aria-expanded', 'true');
        if (onMount) onMount(instance);
    };

    const handleHide = (instance: any) => {
        instance.reference.setAttribute('aria-expanded', 'false');
        if (onHide) onHide(instance);
    };

    const handleTrigger = (instance: any, event: Event) => {
        if (event.type === 'focus') instance.setProps({ delay: 0 });
        if (onTrigger) onTrigger(instance, event);
    };

    return (
        <>
            <Global
                styles={{
                    '.tippy-tooltip.default-theme': {
                        color: colors?.white,
                        backgroundColor: colors?.grey900,
                        border: `1px solid ${colors?.grey900}`,
                        borderRadius: 3,
                    },
                    '.tippy-tooltip[data-placement^=right]>.tippy-arrow': {
                        left: -16,
                        borderRightColor: colors?.grey900,
                    },
                }}
            />
            <Tippy
                theme={theme}
                arrow={arrow}
                ignoreAttributes={ignoreAttributes}
                interactive={interactive}
                aria={aria}
                appendTo={appendTo}
                {...props}
                onMount={handleMount}
                onHide={handleHide}
                onTrigger={handleTrigger}
            >
                {children}
            </Tippy>
        </>
    );
};

export default Tooltip;
