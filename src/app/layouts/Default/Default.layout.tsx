import { Layout } from 'antd';
import App from '../../../App';
import DefaultLayoutBreadcrumb from './components/Breadcrumb';
import DefaultLayoutContent from './components/Content';
import DefaultLayoutHeader from './components/Header';
import LayoutDefaultSidebar from './components/Sidebar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps) {
  return (
    <Layout>
      <DefaultLayoutHeader />
      <Layout>
        <LayoutDefaultSidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <DefaultLayoutBreadcrumb />
          <DefaultLayoutContent>
            <App />
          </DefaultLayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
}
