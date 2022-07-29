import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';

export default function UserDetailsView() {
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

  if (notFound) {
    return <Card>Usuário não encontrado</Card>;
  }

  if (isNaN(Number(params.id))) {
    console.log('entrou');
    navigate('/usuarios');
  }

  if (!user) {
    return <Skeleton />;
  }

  return (
    <Row>
      <Col xs={24} lg={4}>
        <Avatar src={user.avatarUrls.small} size={120} />
      </Col>
      <Col xs={24} lg={20}>
        <Typography.Title level={2}>
          {user.name}
        </Typography.Title>
        <Typography.Paragraph ellipsis>
          {user.bio}
        </Typography.Paragraph>
        <Space>
          <Button type={'primary'}>Editar perfil</Button>
          <Button type={'primary'}>Remover</Button>
        </Space>
      </Col>
    </Row>
  );
}
