import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import {RootState} from '@reducers/index';
import {getEmployee, getVacancies, getVacancy} from "@api/vacancies";


type FiltersType = {
    page?: number
    form?: string
    position?: string
}

interface VacanciesSlice {
    vacancies: { items: [], page: number, pages: number } | null;
    loading: boolean;
    error: SerializedError | null;
}


export const fetchVacancies = createAsyncThunk<any, FiltersType>(
    'vacancies/fetchVacancies',
    async ({page = 0, form = "", position = ""}, {getState}) => {

        try {
            const vacancies = await getVacancies(page, form, position);

            const vacanciesWithFullData = await Promise.all(
                vacancies.items.map(async (item: any) => {

                    const vacancy = await getVacancy(item!.id);
                    const employee = item!.employer.id ? await getEmployee(item!.employer.id) : {};

                    return {...item, desc: vacancy.description, site: employee.site_url};
                })
            );


            // @ts-ignore
            const prevVacancies = page === 0 ? [] : getState().vacancies.vacancies.items;

            return {items: [...prevVacancies, ...vacanciesWithFullData], page: vacancies.page, pages: vacancies.pages};
        } catch (e) {
            throw new Error(e);
        }
    }
);

const vacanciesSlice = createSlice({
    name: 'vacanciesSlice',
    initialState: {vacancies: {}, loading: false, error: null} as VacanciesSlice,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchVacancies.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.vacancies = action.payload;
        });
        builder.addCase(fetchVacancies.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchVacancies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

const {reducer} = vacanciesSlice;

const loading = (state: RootState) => state.vacancies.loading;
const error = (state: RootState) => state.vacancies.error;
const vacancies = (state: RootState) => state.vacancies.vacancies;

export const selectors = {loading, error, vacancies};

export default reducer;