import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTheme } from '@greensight/gds';
import routes from './pages';

const App = () => {
    const { colors } = useTheme();
    const [overlay, setOverlay] = useState(false);

    return (
        <div
            css={{
                ...(overlay && {
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        background: colors?.black,
                        opacity: 0.3,
                    },
                }),
            }}
        >
            <div css={{ display: 'flex' }}>
                <Switch>
                    {routes.map(({ page: Page, status, ...route }) => (
                        <Route
                            key={route.path}
                            render={({ staticContext }: any) => {
                                if (status && staticContext) staticContext.status = status;
                                return <Page />;
                            }}
                            {...route}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
};

export default hot(App);
