import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { User } from '../../types/user';
import { fetchUsers as fetchUsersApi, deleteUser as deleteUserApi } from './usersAPI';

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsersApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteUserApi(userId);
      dispatch(removeUser(userId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(user => user._id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.list.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  }
});

export const { setUsers, addUser, removeUser, updateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
