import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit';
import { notification } from 'antd';
import { User, UserService } from 'daviht7-sdk';
import CustomError from 'daviht7-sdk/dist/CustomError';

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
    async() => UserService.getAllUsers()
);

export const toogleUserStatus = createAsyncThunk(
  'user/toogleUserStatus',
  async (user: User.Summary | User.Detailed) => {
    user.active
      ? await UserService.deactivateExistingUser(user.id)
      : await UserService.activateExistingUser(user.id);

    return user;
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
    .addMatcher(error,
      (state, action) => {
      state.fetching = false;
      notification.error({
        message: action.error.message
      })
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
