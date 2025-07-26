import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/redux/slice/auth.slice";
import shortCodeReducer from "@/redux/slice/url.slice"

const persistConfig = {
    key: "user",
    storage,
};

const shortCodePersistConfig = {
    key: "shortCode",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedShortCodeReducer = persistReducer(shortCodePersistConfig, shortCodeReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        shortCode: persistedShortCodeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;