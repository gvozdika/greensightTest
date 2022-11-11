import React from 'react';
import { scale, useTheme } from '@greensight/gds';
import {
    useTable,
    useSortBy,
    useRowSelect,
    Row,
    Cell as CellProps,
    ColumnInstance,
    HeaderGroup,
    TableHeaderProps,
} from 'react-table';
import { CSSObject } from '@emotion/core';
import typography from '@scripts/typography';
import ArrowDownIcon from '@svg/tokens/small/arrowDown.svg';
import ArrowUpIcon from '@svg/tokens/small/arrowUp.svg';
import KebabIcon from '@svg/tokens/small/kebab.svg';
import SettingsIcon from '@svg/tokens/small/settings.svg';
import LockIcon from '@svg/tokens/small/lock.svg';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import Cell from './Cell';

export interface TableRowProps {
    id: string;
    photo?: string;
    titleAndCode?: string[];
    brand?: string;
    category?: string;
    created?: Date;
    cost?: number;
    count?: number;
    status?: string;
    archive?: string;
}

export interface MoreHeaderGroupProps extends HeaderGroup<TableRowProps> {
    isSorted?: boolean;
    isSortedDesc?: boolean;
    getSortByToggleProps?: () => Partial<TableHeaderProps>;
}

export interface MoreRow extends Row<TableRowProps> {
    isSelected?: boolean;
}

export interface MoreColumnProps extends ColumnInstance<TableRowProps> {
    getProps?: () => {
        type: string;
    };
}

export interface MoreCellProps extends CellProps<TableRowProps, any> {
    column: MoreColumnProps;
}

export interface TableProps {
    columns: {
        Header: string;
    }[];
    data: TableRowProps[];
    handleRowInfo?: () => void;
}

const Table = ({ columns, data, handleRowInfo }: TableProps) => {
    const { colors } = useTheme();

    const arrowStyle: CSSObject = {
        marginLeft: scale(1),
        marginBottom: -scale(1, true),
        fill: colors?.primary,
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }: { getToggleAllRowsSelectedProps: () => void }) => (
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} id="header" />
                    ),
                    Cell: ({ row }: { row: { getToggleRowSelectedProps: () => void; original: { id: string } } }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} id={row.original.id} />
                    ),
                },
                ...columns,
            ]);
        }
    );

    return (
        <div css={{ width: '100%', overflow: 'auto' }}>
            <table
                {...getTableProps()}
                css={{ width: '100%', borderSpacing: 0, borderCollapse: 'collapse', position: 'relative' }}
            >
                <thead>
                    {headerGroups.map((headerGroup, key) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                            {headerGroup.headers.map(
                                (column: MoreHeaderGroupProps) =>
                                    column?.getSortByToggleProps && (
                                        <th
                                            {...column.getHeaderProps(column?.getSortByToggleProps())}
                                            css={{
                                                ...typography('smallBold'),
                                                padding: scale(1),
                                                textAlign: 'left',
                                                borderTop: `1px solid ${colors?.grey400}`,
                                                borderBottom: `1px solid ${colors?.grey400}`,
                                                whiteSpace: 'nowrap',
                                                '&:first-child': {
                                                    verticalAlign: 'top',
                                                },
                                            }}
                                            key={column.id}
                                        >
                                            {column.render('Header')}
                                            {column.isSorted && column.isSortedDesc && (
                                                <ArrowDownIcon css={arrowStyle} />
                                            )}
                                            {column.isSorted && !column.isSortedDesc && (
                                                <ArrowUpIcon css={arrowStyle} />
                                            )}
                                        </th>
                                    )
                            )}
                            <th
                                css={{
                                    ...typography('smallBold'),
                                    padding: scale(1),
                                    textAlign: 'left',
                                    borderTop: `1px solid ${colors?.grey400}`,
                                    borderBottom: `1px solid ${colors?.grey400}`,
                                    whiteSpace: 'nowrap',
                                }}
                                key="new"
                            >
                                <SettingsIcon />
                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: MoreRow, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                key={i}
                                css={{
                                    '&:nth-child(2n+1)': {
                                        background: colors?.grey100,
                                    },
                                }}
                            >
                                {row.cells.map((cell: MoreCellProps) => {
                                    const props = cell.column?.getProps && cell.column.getProps();
                                    const type = props && props.type;

                                    return (
                                        <td
                                            css={{
                                                verticalAlign: 'top',
                                                padding: scale(1),
                                                ...typography('bodySm'),
                                            }}
                                            {...cell.getCellProps()}
                                            key={`${cell.column.id}-${cell.row.id}`}
                                        >
                                            {cell.column.id === 'selection' ? (
                                                cell.render('Cell')
                                            ) : (
                                                <Cell text={cell?.value} type={type} />
                                            )}
                                        </td>
                                    );
                                })}
                                <td css={{ padding: scale(1), verticalAlign: 'top' }}>
                                    {row.isSelected ? (
                                        <LockIcon css={{ fill: colors?.grey600 }} />
                                    ) : (
                                        <button onClick={handleRowInfo} aria-label="Настройки ячейки">
                                            <KebabIcon css={{ fill: colors?.grey800 }} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
