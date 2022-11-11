import React, {FC, useState} from 'react';
import {Button, scale, Layout, useTheme} from '@greensight/gds';


export interface VacancyCardProps {
   vacancy: {
       id: string;
       name: string;
       employer: {
           name: string;
           logo_urls: {
               original: string
           }
       };
       schedule: { name: string }
       site?: string;
       area: {name: string}
       desc: string
   }
}


const VacancyCard: FC<VacancyCardProps> = ({vacancy}) => {

    const {layout} = useTheme();
    const [isFullHeightCard, setIsFullHeightCard] = useState(false);

    const toggleDetails = () => {
        setIsFullHeightCard(prev => !prev);
    }

    return (
        <Layout
            key={vacancy.id}
            cols={{xxxs: 1, xxs: 1, xs: 1, sm: 1, md: 6, lg: 6, xl: 6, xxl: 6, xxxl: 6}}
            css={{
                border: '1px solid #000',
                paddingTop: scale(5, true),
                paddingBottom: scale(5, true),
                marginTop: '39px',
                height: `${!isFullHeightCard && "331px"}`,
                position: 'relative',
                overflow: 'hidden',

                [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                    display: "flex",
                    flexDirection: "column",
                    marginTop: scale(8, true),
                    padding: scale(5, true),
                    height: "auto",
                    maxHeight: `${!isFullHeightCard && "400px"}`,
                },

                [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                    maxHeight: '728px',
                },
            }}
        >
            <Layout.Item
                col={{xxxs: 1, xxs: 1, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2, xxxl: 2}}
                css={{
                    marginLeft: scale(5, true),

                    [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                        marginLeft: 0,
                    },
                }}
            >
                {
                    vacancy.employer.logo_urls && (
                        <div>
                            <img
                                src={vacancy.employer.logo_urls.original}
                                alt='Логотип компании'
                                css={{
                                    width: "auto",
                                    maxWidth: "373px",
                                    maxHeight: "95px",

                                    [`@media (max-width: ${layout?.breakpoints.lg}px)`]: {
                                        maxWidth: "200px",
                                    },

                                    [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                                        width: "auto",
                                        objectFit: "contain"
                                    },

                                    [`@media (max-width: ${layout?.breakpoints.xs}px)`]: {
                                        width: "100%",
                                    },
                                }}
                            />
                        </div>
                    )
                }

                <div>
                    <div css={{marginTop: '17px'}}>
                        <span>Form: </span> <span>{vacancy.schedule.name}</span>
                    </div>
                    <div css={{marginTop: '17px'}}>
                        <span>Company: </span> <span>{vacancy.employer.name}</span>
                    </div>

                    {
                        vacancy.site && (
                            <div
                                css={{marginTop: '17px', display: "flex"}}
                            >
                                <span>
                                    Web:&nbsp;
                                </span>
                                <span
                                    css={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden", display: "block"
                                    }}
                                >
                                    {vacancy.site}
                                </span>
                            </div>
                        )
                    }

                    <div css={{marginTop: '17px'}}>
                        <span>Address: </span> <span>{vacancy.area.name}</span>
                    </div>
                </div>
            </Layout.Item>
            <Layout.Item
                col={{xxxs: 1, xxs: 1, xs: 1, sm: 1, md: 4, lg: 4, xl: 4, xxl: 4, xxxl: 4}}
                css={{
                    marginRight: scale(5, true),
                    overflow: 'hidden',

                    [`@media (min-width: ${layout?.breakpoints.md}px)`]: {
                        position: 'relative',
                    },
                }}
            >
                <h3
                    css={{
                        marginBottom: scale(1),
                        fontWeight: 400,
                        fontSize: scale(4),

                        [`@media (max-width: ${layout?.breakpoints.md}px)`]: {
                            fontSize: "22px",
                            marginRight: 0,
                            marginTop: scale(2),
                            marginBottom: scale(2)
                        },
                    }}
                >
                    {vacancy.name}
                </h3>

                <div
                    css={{
                        p: {marginBottom: scale(2)},
                        ul: {marginBottom: scale(2)}
                }}
                    dangerouslySetInnerHTML={{__html: vacancy.desc}}
                />

                {
                    !isFullHeightCard && (
                        <div
                            css = {{
                                position: 'absolute',
                                bottom: scale(5),
                                left: 0,
                                width: '100%',
                                height: '40%',
                                background: 'linear-gradient(0deg, white, transparent)'
                            }}
                        />
                    )
                }

                <div
                    css={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: scale(5),
                        background: "white",
                    }}
                >
                    <Button
                        theme="secondary"
                        size="sm"
                        onClick={toggleDetails}
                        css={{
                            padding: '0 !important',
                            color: '#A3A6A9 !important',
                            fontSize: '16px !important',
                            background: 'transparent',
                            marginBottom: scale(5, true),

                            [`@media (min-width: ${layout?.breakpoints.md}px)`]: {
                                marginBottom: 0,
                            },
                        }}
                    >
                        {isFullHeightCard ? "close" : "more details"}
                    </Button>
                </div>
            </Layout.Item>
        </Layout>
    )
}

export default VacancyCard;