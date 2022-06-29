import UserForm from '../features/UserForm';
import useUser from '../../core/hooks/useUser';
import { useCallback, useEffect } from 'react';
import { notification, Skeleton } from 'antd';
import { User, UserService } from 'daviht7-sdk';
import moment from 'moment';
export default function UserEditView() {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser(1);
  }, []);

  const transformUserData = useCallback(
    (user: User.Detailed) => {
      return {
        ...user,
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
        birthdate: moment(user.birthdate),
      };
    },
    []
  );

  function handleUserUpdate(user: User.Input) {
    UserService.updateExistingUser(1, user).then(() => {
      notification.success({
        message: 'o Usuário foi alterado com sucesso!',
      });
    });
  }

  if (!user) {
    return <Skeleton />;
  }

  return (
    <UserForm
      onUpdate={handleUserUpdate}
      user={transformUserData(user)}
    ></UserForm>
  );
}
