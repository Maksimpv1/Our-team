import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { teamSlice } from "../reducers/teamReducer";

export const store = configureStore({
    reducer:{
        info: teamSlice.reducer,
    }
})

export type storeType = ReturnType<typeof store.getState>

export const useAppSelectortype: TypedUseSelectorHook<storeType> = useSelector;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();