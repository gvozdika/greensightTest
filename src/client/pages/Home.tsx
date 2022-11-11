import React, {FC} from 'react';
import {scale, Container, Layout, useTheme} from '@greensight/gds';
import VacanciesList from "@containers/VacanciesList";
import RequestForm from "@components/RequestForm";


const Home: FC = () => {

    const {layout} = useTheme();

    return (
        <main
            css={{
                paddingTop: '81px',
                paddingRight: '123px',
                paddingLeft: '123px',
                paddingBottom: scale(4),
                width: "100%",

                [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                    paddingRight: scale(3),
                    paddingLeft: scale(3),
                },
            }}
        >
            <Container css={{padding: '0 !important'}}>
                <h1
                    css={{
                        marginBottom: scale(10),
                        marginTop: 0,
                        fontSize: scale(8),

                        [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                            fontSize: scale(4),
                            marginBottom: '38px',
                        },
                    }}
                >
                    List of vacancies
                </h1>

                <VacanciesList/>


                <div
                    css={{
                        marginTop: '90px',

                        [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                            marginTop: scale(8),
                        },
                    }}
                >
                    <h2
                        css={{
                            marginBottom: '74px',
                            fontSize: scale(8),

                            [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                                fontSize: scale(4),
                                marginBottom: '38px',
                            },
                        }}>
                        Leave a request
                    </h2>

                    <Layout
                        cols={{xxxs: 1, xxs: 1, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2, xxxl: 2}}
                    >
                        <Layout.Item
                            css={{
                                maxWidth: "438px",

                                [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                                    maxWidth: "100%",
                                },
                            }}
                        >
                            <RequestForm/>
                        </Layout.Item>


                        <Layout.Item
                            css={{
                                marginLeft: "20%",

                                [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                                    marginLeft: 0,
                                    marginTop: scale(4),
                                },
                            }}
                        >
                            <span css={{fontSize: '18px'}}>We will advise you and help you start a new project</span>
                            <div
                                css={{
                                    marginTop: "74px",
                                    marginBottom: "78px",
                                    fontSize: scale(4),

                                    [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                                        marginTop: "33px",
                                        marginBottom: "33px",
                                        fontSize: '22px',
                                    },
                                }}
                            >
                                <div>+7 499 391-66-69</div>
                                <div>mail@greensight.ru</div>
                            </div>
                            <span css={{display: "inline-block", marginBottom: "10px", width: "100%"}}>Moscow, Zelenograd, Central Ave., bldg. 305, 3rd floor</span>
                            <span>How to get there?</span>
                        </Layout.Item>
                    </Layout>
                </div>
            </Container>
        </main>
    );
};

export default Home;