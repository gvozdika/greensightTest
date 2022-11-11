import React from 'react';
import loadable from '@loadable/component';
import Loader from '@standart/Loader';
import {fetchVacancies} from "@reducers/vacancies";

const AsyncPage = loadable((props: any) => import(`./${props.page}`), {
    fallback: <Loader/>,
});

interface Route {
    /** Page URL */
    path: string;
    /** Page component name */
    page: string;
    /** Exact */
    exact?: boolean;
    /** Status code (200 if not defined) */
    status?: number;
    /** Data loading function for SSR */
    loadData?: ({store, req}: any) => Promise<any> | Promise<any>[];
}

const routes: Route[] = [
    {
        path: '/',
        page: 'Home',
        exact: true,
        loadData: ({store}) => {
            return store.dispatch(fetchVacancies({}));
        },
    },
];

const finalRoutes = routes.map(route => ({
    ...route,
    exact: !!route.exact,
    page: () => <AsyncPage page={route.page}/>,
}));

export default finalRoutes;
