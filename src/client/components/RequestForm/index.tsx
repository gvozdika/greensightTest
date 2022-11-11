import React, {FC, useState} from 'react'
import {FormikValues} from "formik";
import * as Yup from 'yup';
import {Link} from "react-router-dom";
import {Button, scale, useTheme} from '@greensight/gds';
import Form from "@standart/Form";
import Popup from "@standart/Popup";
import {regName} from '@scripts/regex';


const RequestForm: FC = () => {

    const {colors} = useTheme();
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [requestFormData, setRequestFormData] = useState<FormikValues>({});

    const requestFormFields =  [
        {key: "name", title: "Your name", type: "text", placeholder: "Please introduce yourself"},
        {key: "email", title: "Email", type: "email", placeholder: "ivanov@mail.ru"},
        {key: "phone", title: "Phone number", type: "phone", placeholder: "+7 (999) 123-45-78"},
        {key: "comment", title: "Comment", type: "text", placeholder: "Message text"}
    ]

    const inputFieldStyle = {
        marginBottom: "29px",
        border: 'none',
        borderBottom: `1px solid ${colors?.grey400}`,
        paddingLeft: 0
    }

    return (
        <>
            <Popup
                isOpen={isPopupOpen}
                onRequestClose={() => setIsPopupOpen(false)}
                title="Запрос отправлен"
            >
                {requestFormData && (
                    <>
                        {
                            requestFormFields.map(field => requestFormData[field.key] && (
                                <span
                                    key={field.key}
                                    css={{display: "block", marginBottom: scale(1)}}
                                >
                                    {field.title}: {requestFormData[field.key]}
                                </span>
                            ))
                        }
                    </>
                )}
            </Popup>

            <Form
                css={{marginBottom: '43px'}}
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    comment: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().matches(regName, 'Введите корректное имя').required('Обязательное поле'),
                    phone: Yup.string().matches(/^\+7 \(\d{3}\) \d{3}(?:-\d{2}){2}$/,
                        'Проверьте телефонный формат').required('Обязательное поле'),
                    email: Yup.string().matches(/^[^\s;]+@[^\s;]+\.[^\s;]+(?:;[^\s;]+@[^\s;]+\.[^\s;]+)*$/,
                        'Проверьте формат почты').required('Обязательное поле'),
                })}
                onSubmit={(values, {resetForm}) => {
                    resetForm({values: undefined});
                    setRequestFormData(values);
                    setIsPopupOpen(true);
                }}
            >

                {
                    requestFormFields.map(field => (
                        <Form.Field
                            key={field.key}
                            name={field.key}
                            label={field.title}
                            placeholder={field.placeholder}
                            css={inputFieldStyle}
                        />
                    ))
                }

                <div>
                    <Button
                        type="submit"
                        css={{
                            marginTop: "3px",
                            background: "#000 !important",
                            width: "226px",
                        }}
                    >
                        Send
                    </Button>
                </div>

            </Form>

            <span css={{fontSize: "14px", display: "inline-block", maxWidth: "350px"}}>
                By clicking "Send" you confirm your consent to the&nbsp;
                <Link to={"#"} css={{borderBottomStyle: 'dashed'}}>processing of personal data</Link>
            </span>
        </>
    )
};

export default RequestForm;