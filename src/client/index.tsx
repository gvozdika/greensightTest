import React from 'react';
import '@emotion/core';
import { hydrate } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@greensight/gds';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import reducer from '@reducers/index';
import theme from '@scripts/theme';
import App from './App';

const preloadedState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const storeInitNode = document.querySelector('#init');
if (storeInitNode) storeInitNode.remove();
const store = configureStore({ reducer, preloadedState, devTools: process.env.NODE_ENV !== 'production' });

loadableReady(() =>
    hydrate(
        <Provider store={store}>
            <HelmetProvider>
                <CookiesProvider>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ThemeProvider>
                </CookiesProvider>
            </HelmetProvider>
        </Provider>,
        document.querySelector('#root')
    )
);
