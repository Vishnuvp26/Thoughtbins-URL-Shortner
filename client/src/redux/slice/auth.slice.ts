import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
        setUser: (state, action: PayloadAction<Partial<UserSliceType>>) => {
            Object.assign(state, action.payload);
        },
        removeUser: () => initialState,
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;