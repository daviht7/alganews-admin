import { User } from 'daviht7-sdk';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch();
  

  const users = useSelector(
    (state: RootState) => state.user.list
  );
  const fetching = useSelector(
    (state: RootState) => state.user.fetching
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.getAllUsers() as any);
  }, [dispatch]);

  const toogleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      await dispatch(
        UserActions.toogleUserStatus(user) as any
      );
      await dispatch(UserActions.getAllUsers() as any);
    },
    [dispatch]
  );

  return {
    fetchUsers,
    users,
    fetching,
    toogleUserStatus,
  };
}
