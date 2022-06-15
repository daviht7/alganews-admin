import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
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
import ImageCrop from 'antd-img-crop';
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
    <Form
      layout='vertical'
      onFinish={(form) => console.log('form', form)}
      onFinishFailed={(fields) => {
        const bankAccountErrors = fields.errorFields.reduce(
          (prev, current) =>
            current.name.includes('bankAccount')
              ? prev + 1
              : prev,
          0
        );

        if (bankAccountErrors > 0) {
          window.alert(
            `Existem ${bankAccountErrors} erros na aba dados bancários.`
          );
        }
      }}
    >
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          <ImageCrop rotate shape='round' grid aspect={1}>
            <Upload
              maxCount={1}
              onRemove={() => {
                setAvatar('');
              }}
              beforeUpload={(file) => {
                handleAvatarUpload(file);
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
          </ImageCrop>
        </Col>
        <Col lg={10}>
          <Form.Item
            label={'Nome'}
            name={'name'}
            rules={[
              {
                required: true,
                message: 'o Campo é obrigatório.',
              },
            ]}
          >
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item
            label={'Data de nascimento'}
            name={'birthdate'}
            rules={[
              {
                required: true,
                message: 'o Campo é obrigatório.',
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item
            label={'Bio'}
            name={'bio'}
            rules={[
              {
                required: true,
                message: 'o Campo é obrigatório.',
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Perfil'}
            name={'role'}
            rules={[
              {
                required: true,
                message: 'o Campo é obrigatório.',
              },
            ]}
          >
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
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'o Campo é obrigatório.',
              },
            ]}
          >
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
                  <Form.Item
                    label={'País'}
                    name={['location', 'country']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: Brasil' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Estado'}
                    name={['location', 'state']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: Ceará' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Cidade'}
                    name={['location', 'city']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: Fortaleza' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Telefone'}
                    name={'phone'}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: (85)99418-5335' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'CPF'}
                    name={'taxpayerId'}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: 888.888.888-88' />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Preço por palavra'}
                    name={'pricePerWord'}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder='E.g: 0,00' />
                  </Form.Item>
                </Col>
                {Array(3)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Col lg={6}>
                          <Form.Item
                            label={'Habilidade'}
                            name={['skills', index, 'name']}
                            rules={[
                              {
                                required: true,
                                message:
                                  'o Campo é obrigatório.',
                              },
                            ]}
                          >
                            <Input placeholder='E.g: JavaScript' />
                          </Form.Item>
                        </Col>
                        <Col lg={2}>
                          <Form.Item
                            label={'%'}
                            name={[
                              'skills',
                              index,
                              'percentage',
                            ]}
                            rules={[
                              {
                                required: true,
                                message: '',
                              },
                            ]}
                          >
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
              forceRender={true}
            >
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item
                    label={'Instituição'}
                    name={['bankAccount', 'bankCode']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder={'260'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Agência'}
                    name={['bankAccount', 'agency']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder={'0001'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Conta sem dígito'}
                    name={['bankAccount', 'number']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder={'12345'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Dígito'}
                    name={['bankAccount', 'digit']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
                    <Input placeholder={'1'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Tipo de conta'}
                    name={['bankAccount', 'type']}
                    rules={[
                      {
                        required: true,
                        message: 'o Campo é obrigatório.',
                      },
                    ]}
                  >
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

        <Col lg={24}>
          <Row justify='end'>
            <Button type={'primary'} htmlType={'submit'}>
              Cadastrar usuário
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}
