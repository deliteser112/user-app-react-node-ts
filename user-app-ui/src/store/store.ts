// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
