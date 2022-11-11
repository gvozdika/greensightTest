import { minify } from 'html-minifier-terser';
import { Options } from 'html-minifier';
import { HelmetData } from 'react-helmet-async';
import { RootState } from '@reducers/index';
import newrelicModule from 'newrelic';

interface RenderTemplate {
    content: string;
    scripts: string;
    links: string;
    styles: string;
    helmet: HelmetData;
    initialState: RootState;
    newrelic: typeof newrelicModule;
}

export default ({ content, scripts, links, styles, helmet, initialState, newrelic }: RenderTemplate) => {
    const html = `
        <!DOCTYPE html>
            <html lang="ru" dir="ltr" ${helmet.htmlAttributes.toString()}>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <meta name="format-detection" content="telephone=no" />
                ${newrelic ? newrelic.getBrowserTimingHeader() : ''}
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.base.toString()}
                ${helmet.noscript.toString()}
                ${helmet.style.toString()}
                ${links}
                ${styles}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
                <div id="root">${content}</div>
                <script id="init">
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
                </script>
                ${helmet.script.toString()}
                ${scripts}
            </body>
        `;

    const minifyConfig: Options = {
        collapseWhitespace: true,
        removeComments: true,
        trimCustomFragments: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
    };

    return process.env.NODE_ENV === 'development' ? html : minify(html, minifyConfig);
};
