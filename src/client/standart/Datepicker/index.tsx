import React from 'react';
import { Global, CSSObject } from '@emotion/core';
import { useTheme, scale } from '@greensight/gds';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { IMaskInput } from 'react-imask';
import { FieldInputProps, FieldHelperProps } from 'formik';
import localeSettings from '@scripts/localeSettings';
import { maskDateSingle } from '@scripts/mask';
import typography from '@scripts/typography';
import CalendarIcon from '@svg/calendar.svg';
import ArrowLeftIcon from '@svg/arrow-left.svg';
import ArrowRightIcon from '@svg/arrow-right.svg';

interface NavbarProps {
    /** Previous month click handler. Passed from plugin */
    onPreviousClick?: () => void;
    /** Next month click handler. Passed from plugin  */
    onNextClick?: () => void;
}

interface DatepickerProps {
    /** Calendar type */
    type?: 'single' | 'multiple' | 'range';
    /** Locale */
    locale?: 'ru' | 'en';
    /** Day click event handler */
    onDayClick?: (day: Date, modifiers: any, e: React.MouseEvent<HTMLDivElement>) => void;
    /** Day click event handler */
    onDayMouseEnter?: (day: Date, modifiers: any, e: React.MouseEvent<HTMLDivElement>) => void;
    /** Modifiers */
    modifiers?: any;
    /** Disabled days */
    disabledDays?: any;
    /** Show days from other months */
    showOutsideDays?: boolean;
    /** Show week numbers */
    showWeekNumbers?: boolean;
    /** Additional class */
    className?: string;
}

export interface DatepickerInputProps extends React.HTMLProps<HTMLInputElement> {
    /** Formik field object (inner) */
    field?: FieldInputProps<Date>;
    /** Formik helpers (inner) */
    helpers?: FieldHelperProps<Date>;
    /** Field name (inner) */
    name?: string;
    /** Locale */
    locale?: 'ru' | 'en';
    /** Input format */
    format?: string;
    /** Mask */
    mask?: string;
    /** react-day-picker options */
    dayPickerProps?: DatepickerProps;
    /** Day change event handler */
    onDayChange?(day: Date, DayModifiers: any, dayPickerInput: any): void;
    /** Click unselects day */
    clickUnselectsDay?: boolean;
}

const Navbar = ({ onPreviousClick, onNextClick }: NavbarProps) => {
    const buttonCSS: CSSObject = { position: 'absolute', top: 0, width: scale(6), height: scale(6) };
    return (
        <div>
            <button type="button" onClick={() => onPreviousClick?.()} css={{ ...buttonCSS, left: 0 }}>
                <ArrowLeftIcon title="Предыдущий месяц" />
            </button>
            <button type="button" onClick={() => onNextClick?.()} css={{ ...buttonCSS, right: 0 }}>
                <ArrowRightIcon title="Следующий месяц" />
            </button>
        </div>
    );
};

const Datepicker = ({
    field,
    helpers,
    name,
    locale = 'ru',
    format = 'dd.MM.yyyy',
    mask = maskDateSingle,
    id,
    required,
    onDayChange,
    clickUnselectsDay = true,
    dayPickerProps,
    ...props
}: DatepickerInputProps) => {
    const { colors } = useTheme();

    const parseDate = (str: string, format: string, locale: string) => {
        let options = {};
        if (locale === 'ru') options = { locale: ruLocale };
        const parsed = dateFnsParse(str, format, new Date(), options);
        return DateUtils.isDate(parsed) ? parsed : undefined;
    };

    const formatDate = (date: number | Date, format: string, locale: string) => {
        let options = {};
        if (locale === 'ru') options = { locale: ruLocale };
        return dateFnsFormat(date, format, options);
    };

    const handleDayChange = (day: Date, dayModifiers: any, dayPickerInput: any) => {
        if (helpers) helpers.setValue(day || null);
        if (onDayChange) onDayChange(day, dayModifiers, dayPickerInput);
    };

    let component;
    if (mask) component = IMaskInput;

    return (
        <div css={{ position: 'relative' }}>
            <Global
                styles={{
                    '.DayPicker': {
                        ...typography('body'),
                        '&-wrapper': { paddingBottom: 0 },
                        '&-Month': { margin: 0 },
                        '&-Caption': {
                            marginBottom: 0,
                            padding: `0 ${scale(6)}px`,
                            textAlign: 'center',
                            '& > div': { ...typography('title'), lineHeight: `${scale(6)}px` },
                        },
                        '&-Weekdays': { marginTop: 0 },
                        '&-Weekday': { padding: scale(1), color: colors?.grey20, ...typography('small') },
                        '&-Day': {
                            padding: `${scale(1)}px ${scale(3, true)}px`,
                            borderRadius: 0,
                            color: colors?.black,
                            '&--today': { color: colors?.brand, backgroundColor: 'transparent' },
                            '&--outside': { color: colors?.grey20, backgroundColor: 'transparent' },
                            '&--disabled': { color: colors?.grey20, backgroundColor: 'transparent' },
                            '&--selected:not(&--disabled):not(&--outside)': {
                                color: colors?.white,
                                backgroundColor: colors?.brand,
                            },
                        },
                        '&:not(&--interactionDisabled) &-Day:not(&-Day--disabled):not(&-Day--selected):not(&-Day--outside):hover': {
                            color: colors?.black,
                            backgroundColor: colors?.grey60,
                        },
                        '&:not(&--interactionDisabled) &-Day--selected:not(&-Day--disabled):not(&-Day--outside):hover': {
                            color: colors?.white,
                            backgroundColor: colors?.brandHover,
                        },
                        '&-WeekNumber': {
                            padding: scale(1),
                            borderRight: `1px solid ${colors?.grey20}`,
                            color: colors?.grey20,
                            ...typography('small'),
                        },
                        '&-Footer': { padding: `${scale(1)}px 0`, textAlign: 'center' },
                        '&-TodayButton': { color: colors?.brand, ...typography('small') },
                    },
                    '.DayPickerInput': {
                        display: 'block',
                        input: {
                            ...(props.css as any),
                            width: '100%',
                            paddingRight: scale(6),
                        },
                        '&-Overlay': {
                            position: 'absolute',
                            left: 0,
                            zIndex: 1,
                            backgroundColor: colors?.white,
                            border: `2px solid ${colors?.black}`,
                            borderTop: 'none',
                        },
                    },
                }}
            />
            <DayPickerInput
                inputProps={{ name, id, mask, required, autoComplete: 'off', ...field }}
                format={format}
                parseDate={parseDate}
                formatDate={formatDate}
                placeholder={formatDate(new Date(), format, locale)}
                onDayChange={handleDayChange}
                clickUnselectsDay={clickUnselectsDay}
                component={component}
                dayPickerProps={{
                    showOutsideDays: true,
                    navbarElement: <Navbar />,
                    ...localeSettings(locale),
                    ...dayPickerProps,
                }}
                {...props}
            />
            <div
                css={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: scale(6),
                    height: '100%',
                }}
            >
                <CalendarIcon />
            </div>
        </div>
    );
};

export default Datepicker;
