import { Avatar, Layout, Menu, Row } from 'antd';

import logo from '../../../../assets/logo.svg';

const { Header } = Layout;

export default function DefaultLayoutHeader() {
  return (
    <Header className='header'>
      <Row
        justify='space-between'
        style={{
          height: '100%',
          maxWidth: 1190,
          margin: '0 auto',
        }}
        align='middle'
      >
        <img src={logo} alt={'Alganews - ADMIN'} />
        <Avatar />
      </Row>
    </Header>
  );
}
