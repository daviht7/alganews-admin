import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Progress,
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
      <Col xs={24} lg={12}>
        <Space
          direction='vertical'
          style={{ width: '100%' }}
        >
          {user.skills?.map((skill) => (
            <div key={skill.name}>
              <Typography.Text>
                {skill.name}
              </Typography.Text>
              <Progress
                percent={skill.percentage}
                success={{
                  percent: 0,
                }}
              />
            </div>
          ))}
        </Space>
      </Col>
      <Col xs={24} lg={12}>
        <Descriptions column={1} bordered size={'small'}>
          <Descriptions.Item label={'País'}>
            {user.location.country}
          </Descriptions.Item>
          <Descriptions.Item label={'Estado'}>
            {user.location.state}
          </Descriptions.Item>
          <Descriptions.Item label={'Cidade'}>
            {user.location.city}
          </Descriptions.Item>
          <Descriptions.Item label={'Telefone'}>
            {user.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}
