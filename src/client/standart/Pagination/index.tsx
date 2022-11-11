import React, { useState } from 'react';
import { CSSObject } from '@emotion/core';
import { useTheme, scale } from '@greensight/gds';
import { Link } from 'react-router-dom';
import typography from '@scripts/typography';
import ChevronLeft from '@svg/arrow-left.svg';
import ChevronRight from '@svg/arrow-right.svg';

export interface PaginationProps {
    /** Page url */
    url: string;
    /** Number of pages */
    pages: number;
    /** Active page number */
    activePage: number;
    /** Base number of visible pages */
    baseNumberPages?: number;
    /** Url params */
    urlParams?: [string, string][];
    /** Event after page slection*/
    handlePageSelected?: () => void;
}

const Pagination = ({
    url,
    pages,
    activePage,
    baseNumberPages = 7,
    // urlParams,
    handlePageSelected,
}: PaginationProps) => {
    const { colors } = useTheme();

    const liCSS: CSSObject = {
        width: scale(4),
        height: scale(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const buttonCSS: CSSObject = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color ease 300ms',
    };

    // Находим средний элемент для корректного подсчета отклонений
    const centerIndex = Math.ceil(baseNumberPages / 2);

    // В идеале в рамках проекта реализовывать пагинацию по urlParams(page, 10), например.
    // Данный переключатель для наглядности заменяя page => activePage
    const [page, setActivePage] = useState<number>(activePage);

    // В реальном проекте следует заменять значениями констант, например enums
    const determinePosition = () => {
        if (pages > baseNumberPages) {
            if (page < centerIndex) return 'start';

            if (page > pages - centerIndex + 1) return 'end';

            return 'center';
        } else return 'any';
    };

    const position = determinePosition();

    // Подсчет отображаемых страниц (отображаем либо максимально возможное, либо в зависимости от положения активной страницы)
    const visiblePages = position === 'any' ? pages : position === 'center' ? baseNumberPages : baseNumberPages - 1;

    // Функция определяет номер страницы для каждого элемента массива (подсчет ведется от 1го)
    const getItem = (pageNumber: number) => {
        if (position === 'any') return pageNumber;

        if (pageNumber === 1) return pageNumber;

        if (pageNumber === visiblePages) return pages;

        if ((pageNumber === 2 && position !== 'start') || (pageNumber === visiblePages - 1 && position !== 'end')) {
            return null;
        }

        if (position === 'center') {
            return page + pageNumber - centerIndex;
        }

        if (position === 'end') {
            return pages + pageNumber - visiblePages;
        }

        if (position === 'start') {
            return pageNumber;
        }
    };

    const paginationArray = [...new Array(visiblePages).keys()].map(item => getItem(item + 1));

    return (
        <ul css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <li css={{ ...liCSS }}>
                <Link
                    css={{
                        ...buttonCSS,
                        ...(page === 1 && {
                            fill: colors?.grey600,
                            pointerEvents: 'none',
                        }),
                        '&:hover': {
                            fill: colors?.primaryHover,
                        },
                    }}
                    to={`${url}${1}`}
                    onClick={() => {
                        setActivePage(page - 1);
                        if (handlePageSelected) {
                            handlePageSelected();
                        }
                    }}
                >
                    <ChevronLeft css={{ width: '5px', height: '9px' }} />
                </Link>
            </li>

            {paginationArray.map((item, index) => (
                <li key={index} css={{ ...typography('buttonMd'), ...liCSS }}>
                    {item ? (
                        item === page ? (
                            <span
                                css={{
                                    ...buttonCSS,
                                    ...typography('bodySm'),
                                    fill: colors?.grey900,
                                    border: `1px solid ${colors?.primary}`,
                                    borderRadius: '2px',
                                }}
                            >
                                {item}
                            </span>
                        ) : (
                            <Link
                                css={{
                                    ...typography('bodySm'),
                                    ...buttonCSS,
                                    borderRadius: '2px',
                                    border: `1px solid transparent`,
                                    '&:hover': {
                                        border: `1px solid ${colors?.primaryHover}`,
                                    },
                                }}
                                to={`${url}${item}`}
                                onClick={() => {
                                    setActivePage(item);
                                    if (handlePageSelected) {
                                        handlePageSelected();
                                    }
                                }}
                            >
                                {item}
                            </Link>
                        )
                    ) : (
                        <span css={{ ...typography('bodySm') }}>...</span>
                    )}
                </li>
            ))}
            <li css={{ ...liCSS }}>
                <Link
                    css={{
                        ...buttonCSS,
                        ...(page === pages && {
                            fill: colors?.grey600,
                            pointerEvents: 'none',
                        }),
                        '&:hover': {
                            fill: colors?.primaryHover,
                        },
                    }}
                    to={`${url}${page + 1}`}
                    onClick={() => {
                        setActivePage(page + 1);
                        if (handlePageSelected) {
                            handlePageSelected();
                        }
                    }}
                >
                    <ChevronRight css={{ width: '5px', height: '9px' }} />
                </Link>
            </li>
        </ul>
    );
};

export default Pagination;
