import {
  DiffOutlined,
  FallOutlined,
  HomeOutlined,
  LaptopOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  TableOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export default function LayoutDefaultSidebar() {
  const history = useNavigate();

  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          key={0}
          icon={<HomeOutlined />}
          onClick={() => history('/')}
        >
          Home
        </Menu.Item>
        <SubMenu
          key='1'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Menu.Item
            key='/usuarios'
            icon={<TableOutlined />}
            onClick={() => history('/usuarios')}
          >
            Consulta
          </Menu.Item>
          <Menu.Item
            key='/usuarios/criacao'
            icon={<PlusCircleOutlined />}
            onClick={() => history('/usuarios/criacao')}
          >
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Menu.Item
            key='/pagamentos'
            icon={<TableOutlined />}
            onClick={() => history('/pagamentos')}
          >
            Consulta
          </Menu.Item>
          <Menu.Item
            key='/pagamentos/criacao'
            icon={<PlusCircleOutlined />}
            onClick={() => history('/pagamentos/criacao')}
          >
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<DiffOutlined />}
          title='Fluxo de caixa'
        >
          <Menu.Item
            key='/fluxo-de-caixa/despesas'
            icon={<FallOutlined />}
            onClick={() =>
              history('/fluxo-de-caixa/despesas')
            }
          >
            Despesa
          </Menu.Item>
          <Menu.Item
            key='/fluxo-de-caixa/receitas'
            icon={<RiseOutlined />}
            onClick={() =>
              history('/fluxo-de-caixa/receitas')
            }
          >
            Receita
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
