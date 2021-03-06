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
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const { Sider } = Layout;

export default function LayoutDefaultSidebar() {
  const history = useNavigate();

  const location = useLocation();

  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        key='/'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname.split('/')[1]]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          key={0}
          icon={<HomeOutlined />}
          onClick={() => history('/')}
        >
          <Link to='/'>Home</Link>
        </Menu.Item>
        <SubMenu
          key='usuarios'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Menu.Item
            key='/usuarios'
            icon={<TableOutlined />}
            onClick={() => history('/usuarios')}
          >
            <Link to='/usuarios'>Consulta</Link>
          </Menu.Item>
          <Menu.Item
            key='/usuarios/criacao'
            icon={<PlusCircleOutlined />}
            onClick={() => history('/usuarios/criacao')}
          >
            <Link to='/usuarios/criacao'>Cadastro</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='pagamentos'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Menu.Item
            key='/pagamentos'
            icon={<TableOutlined />}
            onClick={() => history('/pagamentos')}
          >
            <Link to='/pagamentos'>Consulta</Link>
          </Menu.Item>
          <Menu.Item
            key='/pagamentos/criacao'
            icon={<PlusCircleOutlined />}
            onClick={() => history('/pagamentos/criacao')}
          >
            <Link to='/pagamentos/criacao'>Cadastro</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='fluxo-de-caixa'
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
            <Link to='/fluxo-de-caixa/despesas'>
              Despesa
            </Link>
          </Menu.Item>
          <Menu.Item
            key='/fluxo-de-caixa/receitas'
            icon={<RiseOutlined />}
            onClick={() =>
              history('/fluxo-de-caixa/receitas')
            }
          >
            <Link to='/fluxo-de-caixa/receitas'>
              Receita
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
