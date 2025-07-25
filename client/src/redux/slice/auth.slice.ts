import { createSlice } from "@reduxjs/toolkit";

interface UserSliceType {
    _id: string;
    name?: string;
    email: string;
    accessToken: string | null;
}

const initialState: UserSliceType = {
    _id: "",
    name: "",
    email: "",
    accessToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        removeUser: () => {
            return initialState;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken || null;
        },
    },
});

export const { setUser, removeUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;