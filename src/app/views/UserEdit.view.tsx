import { Card, notification, Skeleton } from 'antd';
import { User, UserService } from 'daviht7-sdk';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, fetchUser, notFound } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.id))) {
      fetchUser(Number(params.id));
    } else {
      navigate('/usuarios');
    }
  }, [fetchUser, params.id]);

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

  if (notFound) {
    return <Card>Usuário não encontrado</Card>;
  }

  if (isNaN(Number(params.id))) {
    console.log('entrou');
    navigate('/usuarios');
  }

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
