import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { User, UserService } from 'daviht7-sdk';

interface UserState {
  list: User.Summary[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => UserService.getAllUsers()
);

export const toogleUserStatus = createAsyncThunk(
  'user/toogleUserStatus',
  async (user: User.Summary | User.Detailed) => {
    user.active
      ? UserService.deactivateExistingUser(user.id)
      : UserService.activateExistingUser(user.id);
  }
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(
    getAllUsers,
    toogleUserStatus
  );
  const error = isRejected(getAllUsers, toogleUserStatus);
  const loading = isPending(getAllUsers, toogleUserStatus);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state) => {
      state.fetching = false;
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
