import { useTheme } from '@greensight/gds';

type Breakpoint =
    | 'xxxl'
    | 'xxxlMin'
    | 'xxl'
    | 'xxlMin'
    | 'xl'
    | 'xlMin'
    | 'lg'
    | 'lgMin'
    | 'md'
    | 'mdMin'
    | 'sm'
    | 'smMin'
    | 'xs'
    | 'xsMin'
    | 'xxs'
    | 'xxsMin'
    | 'xxxs'
    | 'xxxsMin';

type dataProps = Record<Breakpoint, string>;

const useMedia = () => {
    const { layout } = useTheme();

    if (layout) {
        const data: dataProps = Object.entries(layout.breakpoints).reduce(
            (acc, [name, value]) => ({
                ...acc,
                [name]: `@media (max-width: ${value - 1}px)`,
                [`${name}Min`]: `@media (min-width: ${value}px)`,
            }),
            {
                xxxl: '',
                xxxlMin: '',
                xxl: '',
                xxlMin: '',
                xl: '',
                xlMin: '',
                lg: '',
                lgMin: '',
                md: '',
                mdMin: '',
                sm: '',
                smMin: '',
                xs: '',
                xsMin: '',
                xxs: '',
                xxsMin: '',
                xxxs: '',
                xxxsMin: '',
            }
        );
        return { ...data };
    }
    return {
        xxxl: '',
        xxxlMin: '',
        xxl: '',
        xxlMin: '',
        xl: '',
        xlMin: '',
        lg: '',
        lgMin: '',
        md: '',
        mdMin: '',
        sm: '',
        smMin: '',
        xs: '',
        xsMin: '',
        xxs: '',
        xxsMin: '',
        xxxs: '',
        xxxsMin: '',
    };
};

export default useMedia;
