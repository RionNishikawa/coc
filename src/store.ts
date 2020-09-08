import { combineReducers, configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userModule from "./modules/userModule";
import characterModule from "./modules/characterModule";

// rootReducer の準備
const rootReducer = combineReducers({
    user: userModule.reducer,
    character: characterModule.reducer
});

// setup 関数を用意してエクスポートする。
export const setupStore = () => {
    const middlewares = [...getDefaultMiddleware(), logger];

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares,
    });
    return store
}