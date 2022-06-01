import { UserOutlined } from '@ant-design/icons';
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
  Upload,
} from 'antd';
import { FileService } from 'daviht7-sdk';
import React, { useCallback, useState } from 'react';

export default function UserForm() {
  const [avatar, setAvatar] = useState<string>('');

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const avatarSource = await FileService.upload(file);
      setAvatar(avatarSource);
    },
    []
  );

  return (
    <Form layout='vertical'>
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <Upload
            onRemove={() => {
              setAvatar('');
            }}
            beforeUpload={async (file) => {
              await handleAvatarUpload(file);
              return false;
            }}
          >
            <Avatar
              size={128}
              src={avatar}
              style={{ cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Upload>
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
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'País'}>
                    <Input placeholder='E.g: Brasil' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Estado'}>
                    <Input placeholder='E.g: Ceará' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Cidade'}>
                    <Input placeholder='E.g: Fortaleza' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Telefone'}>
                    <Input placeholder='E.g: (85)99418-5335' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'CPF'}>
                    <Input placeholder='E.g: 888.888.888-88' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Preço por palavra'}>
                    <Input placeholder='E.g: 0,00' />
                  </Form.Item>
                </Col>
                {Array(3)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Col lg={6}>
                          <Form.Item label={'Habilidade'}>
                            <Input placeholder='E.g: JavaScript' />
                          </Form.Item>
                        </Col>
                        <Col lg={2}>
                          <Form.Item label={'%'}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </React.Fragment>
                    );
                  })}
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane
              key={'bankAccount'}
              tab={'Dados Bancários'}
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'Instituição'}>
                    <Input placeholder={'260'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Agência'}>
                    <Input placeholder={'0001'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Conta sem dígito'}>
                    <Input placeholder={'12345'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Dígito'}>
                    <Input placeholder={'1'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Tipo de conta'}>
                    <Select
                      placeholder={
                        'Selecione o tipo de conta'
                      }
                    >
                      <Select.Option value={'SAVING'}>
                        Conta poupança
                      </Select.Option>
                      <Select.Option value={'CHECKING'}>
                        Conta corrente
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Form>
  );
}
