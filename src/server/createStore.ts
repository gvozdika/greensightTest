import { Request } from 'express';
import { matchPath } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import parser from 'ua-parser-js';
import { toArray } from '@scripts/helpers';
import reducer from '@reducers/index';
import { setUa } from '@reducers/ua';
// import { fetchSeo } from '@reducers/seo';
import routes from '../client/pages';

const createStore = async (req: Request) => {
    const store = configureStore({ reducer });

    /* Заполняем стор статичными данными. */
    store.dispatch(setUa(parser(req.headers['user-agent']) as any));

    /* Загружаем данные, общие для всех страниц. */
    // await Promise.all([store.dispatch(fetchSomething())]);
    // await store.dispatch(fetchSeo(`${req.path}`));

    /* Загружаем данные для запрашиваемого роута. */
    let promises: Promise<any>[] = [];
    routes.some(route => {
        const match = matchPath(req.path, route);
        if (match && route.loadData) promises = toArray(route.loadData({ store, req }));
        return match;
    });
    await Promise.all(promises);

    return store;
};

export default createStore;
