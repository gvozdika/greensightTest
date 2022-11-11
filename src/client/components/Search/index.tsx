import React, { useState } from 'react';
import { scale, useTheme } from '@greensight/gds';
import SearchIcon from '@svg/tokens/small/search.svg';
import ArrowRight from '@svg/tokens/small/chevronRight.svg';
import { useCombobox } from 'downshift';
import { Link } from 'react-router-dom';
import typography from '@scripts/typography';
import { debounce } from '@scripts/helpers';
import CrossIcon from '@svg/tokens/small/closed.svg';
import Loader from '@standart/Loader';
export interface SearchItem {
    link: string;
    name: string;
    price?: string | number;
    category?: string;
    image?: string;
}
export interface SearchProps {
    /** асинхронная функция поиска */
    searchAsyncFunc: (inputValue: string) => Promise<SearchItem[]>;
    /** изначальные данные */
    defaultSearchResultItems: SearchItem[];
    /** флаг удаления выбранного результата после выбора */
    clearInputAfterSelect?: boolean;
    /** время дебаунса */
    debounceTime?: number;
    /** минимальная длина слова для начала поиска */
    minInputLength?: number;
    /** значение поля поиска из пропсов (для изменений поля извне извне) */
    inputValueFromProps?: string;
}

const Search = ({
    searchAsyncFunc,
    defaultSearchResultItems = [],
    clearInputAfterSelect = true,
    debounceTime = 500,
    minInputLength = 3,
    inputValueFromProps = '',
}: SearchProps) => {
    const [loading, setLoading] = useState(false);
    const { colors, shadows } = useTheme();
    const [inputValue, setInputValue] = useState(inputValueFromProps);
    const [searchResultItems, setSearchResultItems] = useState(defaultSearchResultItems);

    const stateReducer = React.useCallback((state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;
        // returning just typed text.
        switch (type) {
            case useCombobox.stateChangeTypes.InputChange: {
                return {
                    // return normal changes.
                    ...changes,
                    // but taking the change from default reducer and use inputValue instead.
                    inputValue: changes.inputValue,
                };
            }
            // also on selection.
            case useCombobox.stateChangeTypes.ItemClick:
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.InputBlur:
                return {
                    ...changes,
                    // if we had an item selected.
                    ...(changes.selectedItem && {
                        // we will show it uppercased.
                        inputValue: changes.selectedItem.name,
                    }),
                };
            default: {
                return changes; // otherwise business as usual.
            }
        }
    }, []);

    const debouncedOnInputValueChange = React.useCallback(
        debounce(async (inputValue: string) => {
            if (inputValue && inputValue.length >= minInputLength) {
                try {
                    setLoading(true);
                    const result = await searchAsyncFunc(inputValue);
                    setSearchResultItems(result);
                    setLoading(false);
                } catch (e) {
                    console.error('Ошибка запроса searchAsyncFunc:', e);
                    setSearchResultItems([]);
                    setLoading(false);
                }
            } else {
                setSearchResultItems([]);
            }
        }, debounceTime),
        [searchAsyncFunc, minInputLength]
    );

    const onInputValueChange = React.useCallback(
        ({ inputValue }) => {
            console.log('onInputValueChange');
            setInputValue(inputValue || '');
            debouncedOnInputValueChange(inputValue);
        },
        [debouncedOnInputValueChange]
    );

    const {
        getMenuProps,
        reset,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
        setInputValue: comboboxSetInputValue,
    } = useCombobox({
        items: searchResultItems,
        inputValue,
        stateReducer,
        onInputValueChange,
        onSelectedItemChange: changes => {
            setInputValue(clearInputAfterSelect ? '' : changes?.selectedItem?.name || '');
            if (clearInputAfterSelect) reset();
        },
    });

    /** если поменялось значение из пропсов обновим стейт инпут, и состояния комбообкса */
    React.useEffect(() => {
        if (inputValueFromProps) {
            comboboxSetInputValue(inputValueFromProps);
        }
    }, [inputValueFromProps, comboboxSetInputValue]);

    return (
        <div css={{ position: 'relative' }}>
            <div
                {...getComboboxProps()}
                css={{
                    display: 'flex',
                    width: '100%',
                    position: 'relative',
                    '::after': {
                        content: '""',
                        position: 'absolute',
                        display: 'block',
                        left: 0,
                        bottom: scale(1),
                        width: `calc(100% - ${scale(7)}px)`,
                        height: 1,
                        backgroundColor: colors?.grey800,
                    },
                }}
            >
                <input
                    {...getInputProps()}
                    css={{
                        border: 'none',
                        borderRadius: 2,
                        paddingLeft: scale(1),
                        paddingRight: scale(9),
                        flexGrow: 1,
                        height: scale(5),
                        background: colors?.white,
                    }}
                />
                {loading ? (
                    <Loader css={{ width: scale(2), height: scale(2), right: 52, position: 'absolute', top: 10 }} />
                ) : inputValue.length > 0 ? (
                    <button
                        type="button"
                        onClick={reset}
                        css={{
                            width: scale(3),
                            height: '100%',
                            fill: 'currentColor',
                            position: 'absolute',
                            right: scale(6),
                        }}
                    >
                        <CrossIcon />
                    </button>
                ) : null}
                <div
                    css={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: scale(5),
                        height: scale(5),
                        backgroundColor: colors?.grey400,
                        flexShrink: 0,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SearchIcon />
                </div>
            </div>
            <ul
                {...getMenuProps()}
                css={{
                    position: 'absolute',
                    top: scale(4),
                    left: 0,
                    width: `calc(100% - ${scale(5)}px)`,
                    backgroundColor: colors?.white,
                    borderRadius: '0 0 4px 4px',
                    boxShadow: shadows?.small,
                    overflow: 'auto',
                    maxHeight: scale(54),
                    zIndex: 1,
                }}
            >
                {searchResultItems.map((item, index) => (
                    <li key={`${item}${index}`} {...getItemProps({ item, index })}>
                        <Link
                            to={item.link}
                            css={{
                                backgroundColor: highlightedIndex === index ? colors?.lightBlue : colors?.white,
                                minHeight: scale(8),
                                padding: scale(1),
                                display: 'flex',
                            }}
                        >
                            <div
                                css={{
                                    width: scale(6),
                                    height: scale(6),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    marginRight: scale(1),
                                }}
                            >
                                {item.image ? (
                                    <img src={item.image} css={{ width: '100%', maxHeight: '100%' }} alt="" />
                                ) : (
                                    <SearchIcon css={{ fill: colors?.grey800 }} />
                                )}
                            </div>
                            <div
                                css={{
                                    ...typography('bodySm'),
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <p>{item.name}</p>
                                {item.category ? <p css={{ color: colors?.grey800 }}>{item.category}</p> : null}
                                {item.price ? <p>{item.price} ₽</p> : null}
                            </div>
                            <div
                                css={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: scale(3),
                                    flexShrink: 0,
                                }}
                            >
                                <ArrowRight css={{ fill: colors?.grey800 }} />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
