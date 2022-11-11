export const isTouch = () => 'ontouchstart' in window;

export const toArray = (arg: any) => [].concat(...[arg]);

export const lang = () => document.documentElement.lang;

export const isObject = (item: any) => typeof item === 'object' && !Array.isArray(item) && item !== null;

export const repeat = (value: any, count: number) => new Array(count).fill(value);

export const debounce = (func: any, wait = 300) => {
    let timeout: NodeJS.Timeout;

    return function (this: any, ...args: any) {
        const next = () => func.apply(this, args);
        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
};

export const humanize = (str: string) => {
    const fragments = str.split('_');
    const capitalizedFragments = fragments.map(frag => `${frag[0].toUpperCase()}${frag.slice(1)}`);
    return capitalizedFragments.join(' ');
};

export const randomizeInt = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

export const declOfNum = (n: number, titles: string[]) =>
    titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

export const getCodeFromUrl = (url: string) => {
    const pathArr = url.split('/').filter(Boolean);
    return pathArr[pathArr.length - 1];
};

export const getIsBrowserSupported = (browser: { name: string; major: number }): boolean => {
    return !(
        browser?.name == 'IE' ||
        (browser?.name == 'Chrome' && browser?.major < 67) ||
        (browser?.name == 'Safari' && browser?.major < 10) ||
        (browser?.name == 'Firefox' && browser?.major < 67) ||
        (browser?.name == 'Edge' && browser?.major < 17) ||
        (browser?.name == 'Opera' && browser?.major < 60)
    );
};

export const wait = (time = 1000) => {
    return new Promise(resolve => setTimeout(() => resolve(true), time));
};

export const trimString = (s: string, count: number) => (s.length > count ? `${s.substr(0, count)}...` : s);

export const convertPrice = (rub: string | number, penny: string | number) =>
    rub && `${rub.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${penny ? penny : '00'}`;
