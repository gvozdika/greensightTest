import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Layout, scale, useTheme} from '@greensight/gds';
import VacancyCard from "@components/VacancyCard/index";
import Select from "@standart/Select";
import CrossIcon from '@svg/cross.svg';
import Form from "@standart/Form";
import {fetchVacancies, selectors} from "@reducers/vacancies";


const VacanciesList: FC = () => {

    const {colors, layout} = useTheme();
    const vacancies = useSelector(selectors.vacancies);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({});

    useEffect(() => {
        dispatch(fetchVacancies(filters))
    }, [filters])

    const loadMore = () => {
        dispatch(fetchVacancies({page: vacancies!.page + 1}));
    }


    return (
        <>
            <Form
                initialValues={{
                    form: '',
                    position: '',
                }}
                onSubmit={() => undefined}
            >
                <Layout
                    cols={{xxxs: 1, xxs: 1, xs: 1, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6, xxxl: 6}}
                    align="end"
                >
                    <Layout.Item col={2}>
                        <Select
                            name="form"
                            label="Form"
                            items={[
                                {value: "fullDay", label: "Полный день"},
                                {value: "shift", label: "Сменный график"},
                                {value: "flexible", label: "Гибкий график"},
                                {value: "remote", label: "Удаленная работа"},
                                {value: "flyInFlyOut", label: "Вахтовый метод"}
                            ]}
                            value="form"
                            placeholder="Not selected"
                            onChange={(e) => {
                                setFilters((prev) => ({...prev, form: e.selectedItem?.value}))
                            }}
                        />
                    </Layout.Item>

                    <Layout.Item col={2}>
                        <Form.Field
                            name="position"
                            label="Position"
                            placeholder='Unspecified'
                            onKeyPress={(e) => {
                                if (e.code === "Enter") {
                                    // @ts-ignore
                                    setFilters((prev) => ({...prev, position: e.target.value}))
                                }
                            }}
                            css={{
                                border: 'none',
                                borderBottom: `1px solid ${colors?.grey400}`,
                                paddingLeft: 0,

                                '::placeholder': {color: "#A3A6A9"}
                            }}
                        />
                    </Layout.Item>

                    <Layout.Item
                        col={2}
                        css={{
                            display: "flex",
                            justifyContent: "end",

                            [`@media (max-width: ${layout?.breakpoints.sm}px)`]: {
                                justifyContent: "start",
                            },
                        }}
                    >
                        <Button
                            theme="secondary"
                            size="sm"
                            onClick={() => {
                                setFilters({})
                            }}
                            css={{
                                paddingRight: '0 !important',
                                paddingLeft: '0 !important',
                                color: '#A3A6A9 !important',
                                fontSize: scale(2),
                            }}
                        >
                            <span css={{marginRight: scale(3, true)}}>Clear sorting</span>
                            <CrossIcon fill='#A3A6A9' width={scale(3, true)} height={scale(3, true)}/>
                        </Button>
                    </Layout.Item>
                </Layout>
            </Form>

            <div>

                {vacancies?.items.length
                    ? vacancies.items.map((vacancy: any) => (
                        <VacancyCard vacancy={vacancy} key={vacancy.id}/>
                    ))
                    : null}


                {
                    vacancies!.pages - vacancies!.page !== 1 && (
                        <div css={{textAlign: 'center', marginTop: scale(5, true)}}>
                            <Button
                                onClick={loadMore}
                                css={{background: "#000 !important", width: "15%", minWidth: "110px"}}
                            >
                                Show more
                            </Button>
                        </div>
                    )
                }

            </div>
        </>
    )
};

export default VacanciesList;