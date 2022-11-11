type Locals = 'ru' | 'en';

const localeSettings = (locale: Locals = 'ru') => {
    const MONTHS = {
        ru: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        en: undefined,
    };
    const WEEKDAYS_LONG = {
        ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        en: undefined,
    };
    const WEEKDAYS_SHORT = {
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        en: undefined,
    };
    const FIRST_DAY_OF_WEEK = {
        ru: 1,
        en: undefined,
    };
    const LABELS = {
        ru: { nextMonth: 'Следующий месяц', previousMonth: 'Предыдущий месяц' },
        en: undefined,
    };

    return {
        locale,
        months: MONTHS[locale],
        weekdaysLong: WEEKDAYS_LONG[locale],
        weekdaysShort: WEEKDAYS_SHORT[locale],
        firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
        labels: LABELS[locale],
    };
};

export default localeSettings;
