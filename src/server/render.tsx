import React from 'react';
import { Request, Response } from 'express';
import { resolve } from 'path';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { resetIdCounter } from 'react-tabs';
import { ThemeProvider } from '@greensight/gds';
import theme from '@scripts/theme';
import createStore from './createStore';
import template from './template';
import App from '../client/App';
import UnsupportedBrowsers from '@standart/UnsupportedBrowsers';
import { getIsBrowserSupported } from '@scripts/helpers';
import useragent from 'express-useragent';

export default () => async (req: Request, res: Response) => {
    const store = await createStore(req);

    resetIdCounter();

    const statsFile = resolve('./build/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile });

    const source = req.headers['user-agent'];
    const ua = useragent.parse(source || '');

    const browser = store.getState().ua.ua?.browser as { name: string; major: number };
    const isBrowserSupported = getIsBrowserSupported(browser);
    const jsx =
        isBrowserSupported || ua.isBot
            ? extractor.collectChunks(<App />)
            : extractor.collectChunks(<UnsupportedBrowsers />);

    const staticContext: StaticContext = {};
    const helmetContext: any = {};

    const content = renderToString(
        <Provider store={store}>
            <HelmetProvider context={helmetContext}>
                <CookiesProvider cookies={(req as any).universalCookies}>
                    <StaticRouter location={req.url} context={staticContext}>
                        <ThemeProvider theme={theme}>{jsx}</ThemeProvider>
                    </StaticRouter>
                </CookiesProvider>
            </HelmetProvider>
        </Provider>
    );

    const { helmet } = helmetContext;

    const initialState = store.getState();

    const scripts = extractor.getScriptTags();
    const links = extractor.getLinkTags();
    const styles = extractor.getStyleTags();
    const html = template({
        content,
        scripts: (isBrowserSupported && scripts) || '',
        links,
        styles,
        helmet,
        initialState,
        newrelic: req.app.locals.newrelic,
    });

    if (staticContext.url) {
        res.redirect(staticContext.status || 301, staticContext.url);
    } else {
        res.status(staticContext.status || 200).send(html);
    }
};
