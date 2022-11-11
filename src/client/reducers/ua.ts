import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reducers/index';

interface UA {
    device: {
        type: string;
    };
    browser: {
        name: string;
        major: number;
    };
}

interface UaSlice {
    ua: UA | null;
}

const uaSlice = createSlice({
    name: 'ua',
    initialState: { ua: null } as UaSlice,
    reducers: {
        setUa: (state, action: PayloadAction<UA>) => {
            state.ua = action.payload;
        },
    },
});

const { reducer, actions } = uaSlice;
export const { setUa } = actions;

const ua = (state: RootState) => state.ua.ua;

export const selectors = { ua };

export default reducer;
