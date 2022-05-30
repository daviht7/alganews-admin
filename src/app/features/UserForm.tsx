import {
  Avatar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Tabs,
} from 'antd';

export default function UserForm() {
  return (
    <Form layout='vertical'>
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <Avatar size={128} />
        </Col>
        <Col lg={10}>
          <Form.Item label={'Nome'}>
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item label={'Data de nascimento'}>
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item label={'Bio'}>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item label={'Perfil'}>
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'EDITOR'}>
                Editor
              </Select.Option>
              <Select.Option value={'ASSISTANT'}>
                Assistente
              </Select.Option>
              <Select.Option value={'MANAGER'}>
                Gerente
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item label={'Email'}>
            <Input
              type='email'
              placeholder={'E.g: contato@joao.com.br'}
            />
          </Form.Item>
        </Col>
        <Col lg={24}>
          <Divider />
        </Col>
        <Col lg={24}>
          <Tabs
            defaultActiveKey='personal'
            onChange={() => {}}
          >
            <Tabs.TabPane
              key={'personal'}
              tab={'Dados Pessoais'}
            ></Tabs.TabPane>
            <Tabs.TabPane
              key={'bankAccount'}
              tab={'Dados Bancários'}
            ></Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Form>
  );
}
