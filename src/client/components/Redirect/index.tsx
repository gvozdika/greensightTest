import React from 'react';
import { Route, Redirect as RouterRedirect, RedirectProps as RouterRedirectProps } from 'react-router-dom';

interface RedirectProps extends RouterRedirectProps {
    /** Redirect status */
    status?: number;
}

const Redirect = ({ from, to, status = 301 }: RedirectProps) => {
    return (
        <Route
            render={({ staticContext }: any) => {
                if (staticContext) staticContext.status = status;
                return <RouterRedirect from={from} to={to} />;
            }}
        />
    );
};

export default Redirect;
