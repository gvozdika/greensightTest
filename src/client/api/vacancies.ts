import apiClient from '@api/index';


export const getVacancies = async (page: number, form: string, position: string) => {
    const res = await apiClient(
        `https://api.hh.ru/vacancies?page=${page}&per_page=5${form && `&schedule=${form}`}${position && `&search_field=name&text=${position}`}`
    );
    return res.data;
};

export const getVacancy = async (vacancyId: string) => {
    const res = await apiClient(`https://api.hh.ru/vacancies/${vacancyId}`);
    return res.data;
};

export const getEmployee = async (employeeId: string) => {
    const res = await apiClient(`https://api.hh.ru/employers/${employeeId}`);
    return res.data;
};