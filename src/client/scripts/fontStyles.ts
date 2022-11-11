import PTRootUIRegularWoff2 from '../fonts/PTRootUI/PTRootUI-Regular.woff2';
import PTRootUIRegularWoff from '../fonts/PTRootUI/PTRootUI-Regular.woff';
import PTRootUIBoldWoff2 from '../fonts/PTRootUI/PTRootUI-Bold.woff2';
import PTRootUIBoldWoff from '../fonts/PTRootUI/PTRootUI-Bold.woff';
import PTRootUIMediumWoff2 from '../fonts/PTRootUI/PTRootUI-Medium.woff2';
import PTRootUIMediumWoff from '../fonts/PTRootUI/PTRootUI-Medium.woff';
import PTRootUIVF from '../fonts/PTRootUI/PTRootUI-VF.woff2';
// import { CSSObject } from '@emotion/core';

const fontStyles = [
    {
        '@font-face': {
            fontFamily: 'PT Root UI',
            src: `url(${PTRootUIRegularWoff2}) format('woff2'), url(${PTRootUIRegularWoff}) format('woff')`,
            fontDisplay: 'swap',
        },
    },
    {
        '@font-face': {
            fontFamily: 'PT Root UI',
            src: `url(${PTRootUIMediumWoff2}) format('woff2'), url(${PTRootUIMediumWoff}) format('woff')`,
            fontDisplay: 'swap',
            fontWeight: 500,
        },
    },
    {
        '@font-face': {
            fontFamily: 'PT Root UI',
            src: `url(${PTRootUIBoldWoff2}) format('woff2'), url(${PTRootUIBoldWoff}) format('woff')`,
            fontDisplay: 'swap',
            fontWeight: 700,
        },
    },
    {
        '@font-face': {
            fontFamily: 'PT Root UI VF',
            src: `url(${PTRootUIVF}) format('woff2 supports variations'), url(${PTRootUIVF}) format('woff2-variations')`,
            fontDisplay: 'swap',
            fontWeight: [300, 700],
        },
    },
];

export default fontStyles;
