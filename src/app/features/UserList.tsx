import {
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Input,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { User } from 'daviht7-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';

export default function UserList() {
  const { users, fetchUsers, toogleUserStatus, fetching } =
    useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string
  ): ColumnProps<User.Summary> => ({
    filterDropdown: ({
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Card>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSelectedKeys(
              e.target.value ? [e.target.value] : []
            );
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type={'primary'}
            size={'small'}
            style={{ width: 90 }}
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          <Button
            onClick={clearFilters}
            size={'small'}
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#0099ff' : undefined }}
      />
    ),
    // @ts-ignore
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
  });

  return (
    <>
      <Table<User.Summary>
        loading={fetching}
        dataSource={users}
        pagination={false}
        rowKey={'id'}
        columns={[
          {
            title: 'Usuários',
            responsive: ['xs'],
            render(user: User.Summary) {
              return (
                <Descriptions column={1} size={'small'}>
                  <Descriptions.Item label={'Nome'}>
                    {user.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Email'}>
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Criação'}>
                    {format(
                      parseISO(user.createdAt),
                      'dd/MM/yyyy'
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Perfil'}>
                    {
                      <Tag
                        color={
                          user.role === 'MANAGER'
                            ? 'red'
                            : 'blue'
                        }
                      >
                        {user.role === 'EDITOR'
                          ? 'Editor'
                          : user.role === 'MANAGER'
                          ? 'Gerente'
                          : 'Assistente'}
                      </Tag>
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ações'}>
                    <Button
                      size='small'
                      icon={<EyeOutlined />}
                    />
                    <Button
                      size='small'
                      icon={<EditOutlined />}
                    />
                  </Descriptions.Item>
                </Descriptions>
              );
            },
          },
          {
            dataIndex: 'avatarUrls',
            title: '',
            width: 48,
            fixed: 'left',
            responsive: ['sm'],
            render(avatarUrls: User.Summary['avatarUrls']) {
              return (
                <Avatar
                  size={'small'}
                  src={avatarUrls.small}
                />
              );
            },
          },
          {
            dataIndex: 'name',
            title: 'Nome',
            ...getColumnSearchProps('name', 'nome'),
            width: 160,
            ellipsis: true,
            responsive: ['sm'],
          },
          {
            dataIndex: 'email',
            title: 'Email',
            responsive: ['sm'],
            ellipsis: true,
            width: 240,
            ...getColumnSearchProps('email', 'Email'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            sorter(a, b) {
              return a.role.localeCompare(b.role);
            },
            align: 'center',
            responsive: ['sm'],
            width: 100,
            render(role) {
              return (
                <Tag
                  color={
                    role === 'MANAGER' ? 'red' : 'blue'
                  }
                >
                  {role === 'EDITOR'
                    ? 'Editor'
                    : role === 'MANAGER'
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
            sorter(a, b) {
              return new Date(a.createdAt) >
                new Date(b.createdAt)
                ? 1
                : -1;
            },
            responsive: ['sm'],
            width: 120,
            render(createdAt: string) {
              return format(
                parseISO(createdAt),
                'dd/MM/yyyy'
              );
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            responsive: ['sm'],
            width: 100,
            render(active: boolean, user) {
              return (
                <Switch
                  onChange={() => {
                    toogleUserStatus(user);
                  }}
                  checked={active}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            responsive: ['sm'],
            width: 100,
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
