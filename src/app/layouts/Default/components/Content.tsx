import { Layout } from 'antd';

const { Content } = Layout;

interface DefaulLayoutContentProps {
  children: React.ReactNode;
}

export default function DefaulLayoutContent({
  children,
}: DefaulLayoutContentProps) {
  return (
    <Content
      className='site-layout-background'
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      {children}
    </Content>
  );
}
