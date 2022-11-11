import React from 'react';
import { format } from 'date-fns';
import Badge from '@components/Badge';
import Picture from '@standart/Picture';
import { trimString, convertPrice } from '@scripts/helpers';
import { MAX_STRING_SIZE } from '@scripts/constants';
import noImage from '@images/simple/noimage.png';
import { CELL_TYPES } from '@scripts/enums';
import { useTheme } from '@greensight/gds';

interface CellProps {
    text?: string;
    type?: string;
}

const Cell = ({ text, type }: CellProps) => {
    const { colors } = useTheme();

    if (type === CELL_TYPES.PHOTO) {
        return <Picture css={{ width: 48, height: 48, maxWidth: 'none' }} image={text || noImage} alt="" />;
    }

    if (!text) return <p>-</p>;

    const trimText = trimString(text.toString(), MAX_STRING_SIZE);

    if (!type) return <p>{trimText}</p>;

    if (type === CELL_TYPES.DOUBLE) {
        const title = text[0];
        const descr = text[1];

        return (
            <div>
                <p>{title}</p> <span css={{ color: colors?.grey800 }}>{descr}</span>
            </div>
        );
    }

    if (type === CELL_TYPES.STATUS) return <Badge text={text} />;

    if (type === CELL_TYPES.COST) {
        return <span css={{ whiteSpace: 'nowrap' }}>{convertPrice(text, 30)}</span>;
    }

    if (type === CELL_TYPES.DATE) return <p>{format(new Date(text), 'dd.MM.yyyy')}</p>;
    return <p>-</p>;
};

export default Cell;
