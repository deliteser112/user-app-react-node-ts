// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersReducer from '../features/users/usersSlice';
// Import other slices if you have more

const rootReducer = combineReducers({
  // Add other reducers here
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
