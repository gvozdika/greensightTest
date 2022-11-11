import { CSSObject } from '@emotion/core';
import { useTheme, scale } from '@greensight/gds';
import typography from '@scripts/typography';

export enum FieldType {
    BASIC = 'basic',
}

const useFieldCSS = () => {
    const { colors } = useTheme();

    const basicFieldCSS: CSSObject = {
        width: '100%',
        padding: `${scale(1, true)}px ${scale(1)}px`,
        border: `1px solid ${colors?.grey400}`,
        borderRadius: 2,
        ...typography('bodySm'),
        fontWeight: 400,
        ':focus': { outline: 'none', borderColor: colors?.primary },
        ':disabled': { background: colors?.grey200, border: `1px solid ${colors?.grey400}`, color: colors?.grey600 },
        placeholder: { color: colors?.grey800 },
    };

    const getFieldCSS = (type: FieldType) => {
        switch (type) {
            case FieldType.BASIC:
                return basicFieldCSS;
            default:
                return basicFieldCSS;
        }
    };
    return { basicFieldCSS, getFieldCSS };
};

export default useFieldCSS;
