import React, { useState, useRef } from 'react';
import { useTheme, scale } from '@greensight/gds';
import { Link } from 'react-router-dom';
import { CSSObject } from '@emotion/core';
import useOnClickOutside from '@scripts/useOnClickOutside';
import CheckIcon from '@svg/tokens/small/check.svg';
import ChevronRightIcon from '@svg/tokens/small/chevronRight.svg';
import ChevronLeftIcon from '@svg/tokens/small/chevronLeft.svg';

enum MENU_TYPES {
    // 1 уровень меню
    MAIN = 'main',
    // 2 уровень меню
    SUBMENU = 'submenu',
    // 3 уровень меню
    STATUSES = 'statuses',
}

enum TRIGGERS {
    HOVER = 'hover',
    CLICK = 'click',
}

enum MENU_WIDTH {
    MAIN = 236,
    MAIN_CUT = 64,
    SUBMENU = 253,
}

export interface MenuItemProps {
    id: number;
    text: string;
    link?: string;
    subMenu?: MenuItemProps[];
    active?: boolean;
    Icon?: SVGRIcon;
}

export interface SidebarProps {
    menuItems: MenuItemProps[];
    isCutDown: boolean;
    cutDownHandler: () => void;
    setOverlay: (overlay: boolean) => void;
}

const getMainMenuWidth = (isCutDown: boolean) => (!isCutDown ? MENU_WIDTH.MAIN : MENU_WIDTH.MAIN_CUT);

const Sidebar = ({ menuItems = [], isCutDown, cutDownHandler, setOverlay, ...props }: SidebarProps) => {
    const { colors } = useTheme();
    const [menuItem, setMenuItem] = useState<MenuItemProps | null>(null);
    const [subItem, setSubItem] = useState<MenuItemProps | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const closeAllMenu = () => {
        setMenuItem(null);
        setSubItem(null);
    };

    useOnClickOutside(menuRef, () => {
        closeAllMenu();
        setOverlay(false);
    });

    const menuItemStyle: CSSObject = {
        display: 'flex',
        alignItems: 'center',
        color: colors?.grey600,
        fill: 'currentColor',
        width: '100%',
        padding: `${scale(3, true)}px ${scale(3)}px`,
        textAlign: 'left',
        bacground: 'transparent',
        transition: `color ease 300ms, background ease 300ms`,
        '&:hover': {
            color: colors?.white,
            backgroundColor: colors?.dark,
        },
    };

    const subMenuStyle = (type: string) =>
        ({
            width: MENU_WIDTH.SUBMENU,
            backgroundColor: colors?.white,
            borderLeft: `1px solid ${colors?.lightBlue}`,
            position: 'absolute',
            height: '100%',
            left: getMainMenuWidth(isCutDown) + (type === MENU_TYPES.STATUSES ? MENU_WIDTH.SUBMENU : 0),
        } as CSSObject);

    const getMenuItemContent = (menuItem: MenuItemProps, type: string) => (
        <>
            {menuItem.Icon && <menuItem.Icon css={{ marginRight: scale(2), flexShrink: 0 }} />}
            {(!isCutDown || type !== MENU_TYPES.MAIN) && (
                <>
                    <span css={{ marginRight: scale(2) }}>{menuItem.text}</span>
                    {type === MENU_TYPES.STATUSES && menuItem.active && (
                        <CheckIcon css={{ marginLeft: 'auto', flexShrink: 0 }} />
                    )}
                    {type !== MENU_TYPES.STATUSES && menuItem.subMenu && menuItem.subMenu.length > 0 && (
                        <ChevronRightIcon css={{ marginLeft: 'auto', flexShrink: 0 }} />
                    )}
                </>
            )}
        </>
    );

    const getListElement = (
        listItem: MenuItemProps,
        setItem: ((item: MenuItemProps | null) => void) | null,
        type: string,
        trigger = TRIGGERS.CLICK
    ) => {
        const lightTheme = type === MENU_TYPES.STATUSES || type === MENU_TYPES.SUBMENU;

        const itemStyle: CSSObject = {
            ...menuItemStyle,
            '&:disabled': {
                cursor: 'default',
                color: colors?.grey600,
            },
            ...(lightTheme && {
                color: colors?.black,
                '&:hover': {
                    color: colors?.primary,
                    background: 'transparent',
                },
            }),
            ...(listItem.active && {
                color: colors?.primary,
            }),
        };

        const isNotActiveAlready =
            (menuItem && listItem.id === menuItem.id && type === MENU_TYPES.MAIN) ||
            (subItem && listItem.id === subItem.id && type === MENU_TYPES.SUBMENU);
        const isActiveBtn = !!(listItem.subMenu && !isNotActiveAlready);

        const menuBtnTrigger = () => {
            if (isActiveBtn) {
                if (type === MENU_TYPES.MAIN) {
                    closeAllMenu();
                }

                if (setItem) setItem(listItem);
            } else {
                if (type === MENU_TYPES.SUBMENU) {
                    if (setItem) setItem(null);
                } else {
                    closeAllMenu();
                }
            }

            if (setOverlay && type === MENU_TYPES.MAIN) setOverlay(isActiveBtn);
        };

        const menuLinkTrigger = () => {
            if (type === MENU_TYPES.STATUSES && setItem) {
                setItem(null);
            } else {
                closeAllMenu();
            }
            if (setOverlay) setOverlay(false);
        };

        const isDisableItem = !listItem.subMenu || listItem.subMenu.length === 0;

        return (
            <>
                {listItem.link && isDisableItem ? (
                    <Link css={itemStyle} to={listItem.link} onClick={menuLinkTrigger}>
                        {getMenuItemContent(listItem, type)}
                    </Link>
                ) : (
                    <button
                        css={itemStyle}
                        disabled={isDisableItem}
                        onClick={menuBtnTrigger}
                        onMouseEnter={trigger === TRIGGERS.HOVER && isActiveBtn ? menuBtnTrigger : undefined}
                    >
                        {getMenuItemContent(listItem, type)}
                    </button>
                )}
            </>
        );
    };

    const getMenuLvl = (
        menuItem: MenuItemProps,
        setSubItem: ((item: MenuItemProps | null) => void) | null,
        menuType: string,
        trigger = TRIGGERS.CLICK
    ) =>
        menuItem && (
            <div css={subMenuStyle(menuType)}>
                <ul>
                    {menuItem?.subMenu?.map(subMenuItem => (
                        <li key={subMenuItem.id}>{getListElement(subMenuItem, setSubItem, menuType, trigger)}</li>
                    ))}
                </ul>
            </div>
        );

    return (
        <aside
            css={{
                display: 'flex',
                position: 'relative',
            }}
            ref={menuRef}
            {...props}
        >
            <div
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: getMainMenuWidth(isCutDown),
                    height: '100%',
                    backgroundColor: colors?.secondaryHover,
                    color: colors?.white,
                }}
            >
                <ul css={{ overflow: 'auto' }}>
                    {menuItems.map(menuItem => (
                        <li key={menuItem.id}>{getListElement(menuItem, setMenuItem, MENU_TYPES.MAIN)}</li>
                    ))}
                </ul>
                <button
                    css={{
                        ...menuItemStyle,
                        ...(isCutDown && {
                            justifyContent: 'center',
                        }),
                        padding: `${scale(2)}px ${scale(3)}px`,
                    }}
                    onClick={cutDownHandler}
                >
                    {!isCutDown ? (
                        <>
                            <ChevronLeftIcon css={{ marginRight: scale(1) }} />
                            Свернуть
                        </>
                    ) : (
                        <ChevronRightIcon />
                    )}
                </button>
            </div>
            {menuItem && getMenuLvl(menuItem, setSubItem, MENU_TYPES.SUBMENU, TRIGGERS.HOVER)}
            {menuItem && subItem && getMenuLvl(subItem, null, MENU_TYPES.STATUSES)}
        </aside>
    );
};

export default Sidebar;
