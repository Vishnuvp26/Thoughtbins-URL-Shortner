import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ShortCodeState {
    value: string;
};

const initialState: ShortCodeState = {
    value: "",
};

const shortCodeSlice = createSlice({
    name: "shortCode",
    initialState,
    reducers: {
        setShortCode: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        clearShortCode: (state) => {
            state.value = "";
        }
    }
});

export const { setShortCode, clearShortCode } = shortCodeSlice.actions;
export default shortCodeSlice.reducer;