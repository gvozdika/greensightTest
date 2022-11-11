import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import { Button, scale, Container } from '@greensight/gds';
import typography from '@scripts/typography';

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Helmet>
                <title>Страница не найдена</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <main css={{ paddingBottom: scale(4), textAlign: 'center' }}>
                <Container>
                    <h1 css={typography('h1')}>Ошибка 404</h1>
                    <p css={{ marginBottom: scale(2) }}>
                        Страница <strong>{pathname}</strong> не найдена
                    </p>
                    <Button as={Link} to="/">
                        На главную
                    </Button>
                </Container>
            </main>
        </>
    );
};
export default NotFound;
