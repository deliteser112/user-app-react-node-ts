// src/features/users/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { User } from '../../types/user';

interface UsersState {
  list: User[];
}

const initialState: UsersState = {
  list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.list;

export default usersSlice.reducer;
