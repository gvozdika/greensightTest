type SVGRIcon = React.FC<
    React.SVGProps<SVGSVGElement> & {
        /** Alternative text (a11y) */
        title?: string;
    }
>;

declare module '*.svg' {
    const value: SVGRIcon;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}

declare module '*.woff2' {
    const value: string;
    export default value;
}

declare module '*.woff' {
    const value: string;
    export default value;
}

declare module 'react-tabs';
declare module 'html-minifier-terser';
declare module 'speed-measure-webpack-plugin';
declare module 'pnp-webpack-plugin';
declare module 'imagemin-webp-webpack-plugin';
declare module 'imagemin-mozjpeg';
declare module 'react-day-picker';
declare module 'react-day-picker/DayPickerInput';
declare module 'react-imask';

declare module 'ua-parser-js' {
    const value: (headers: any) => string;
    export default value;
}
