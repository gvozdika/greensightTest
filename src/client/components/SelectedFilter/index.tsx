import React from 'react';
import { useTheme, scale } from '@greensight/gds';
import CrossIcon from '@svg/cross.svg';

export interface SelectedFilterProps {
    text: string;
    onRemoveFilter: () => void;
}

const SelectedFilter = ({ text, onRemoveFilter }: SelectedFilterProps) => {
    const { colors } = useTheme();

    return (
        <div
            css={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: colors?.primary,
                color: colors?.white,
                borderRadius: 2,
                padding: `0 ${scale(1)}px`,
                fontSize: 12,
            }}
        >
            {text}
            <button
                css={{ padding: `${scale(1, true)}px ${scale(1)}px`, fill: colors?.grey400 }}
                aria-label="Удалить фильтр"
            >
                <CrossIcon css={{ width: 10, height: 10 }} onClick={onRemoveFilter} />
            </button>
        </div>
    );
};

export default SelectedFilter;
