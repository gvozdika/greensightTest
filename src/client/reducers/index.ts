import { combineReducers, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import ua from './ua';
import vacancies from './vacancies';

const rootReducer = combineReducers({
    ua,
    vacancies
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default rootReducer;
