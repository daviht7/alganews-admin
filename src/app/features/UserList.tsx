import {
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import { format } from 'date-fns';
import { User } from 'daviht7-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';

export default function UserList() {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            render(name: string, row) {
              return (
                <Space>
                  <Avatar
                    size={'small'}
                    src={row.avatarUrls.small}
                  />
                  <Typography.Text
                    ellipsis
                    style={{ maxWidth: 180 }}
                  >
                    {name}
                  </Typography.Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'Email',
            ellipsis: true,
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role) {
              return (
                <Tag
                  color={
                    role === 'MANAGER' ? 'red' : 'success'
                  }
                >
                  {role === 'EDITOR'
                    ? 'Editor'
                    : role === 'Manager'
                    ? 'Gerente'
                    : 'Assistente'}
                </Tag>
              );
            },
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            align: 'center',
            render(createdAt: string) {
              return format(
                new Date(createdAt),
                'dd/MM/yyyy'
              );
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            render(active: boolean) {
              return <Switch defaultChecked={active} />;
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            render() {
              return (
                <>
                  <Button
                    size='small'
                    icon={<EyeOutlined />}
                  />
                  <Button
                    size='small'
                    icon={<EditOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
