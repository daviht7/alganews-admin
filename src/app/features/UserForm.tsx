import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
  Tabs,
  Upload,
} from 'antd';
import ImageCrop from 'antd-img-crop';
import {
  FileService,
  User,
  UserService,
} from 'daviht7-sdk';
import CustomError from 'daviht7-sdk/dist/CustomError';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

export default function UserForm() {
  const [form] = Form.useForm<User.Input>();
  const [avatar, setAvatar] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'personal' | 'bankAccount'
  >('personal');

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const avatarSource = await FileService.upload(file);
      setAvatar(avatarSource);
    },
    []
  );

  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: avatar || undefined,
    });
  }, [avatar]);

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={async (user: User.Input) => {
        try {
          await UserService.insertNewUser(user);
          notification.success({
            message: 'Sucesso',
            description: 'Usuário criado com sucesso!',
          });
        } catch (error) {
          if (error instanceof CustomError) {
            if (error.data?.objects) {
              form.setFields(
                error.data.objects.map((error) => {
                  return {
                    name: error.name
                      ?.split(/(\.|\[|\])/gi)
                      .filter(
                        (str) =>
                          str !== '.' &&
                          str !== '[' &&
                          str !== ']' &&
                          str !== ''
                      )
                      .map((str) =>
                        isNaN(Number(str))
                          ? str
                          : Number(str)
                      ) as string[],
                    errors: [error.userMessage],
                  };
                })
              );
            }
          } else {
            notification.error({
              message: 'Houve um erro',
            });
          }
        }
      }}
      onFinishFailed={(fields) => {
        let bankAccountErrors = 0;
        let pessoalDataErrors = 0;

        fields.errorFields.forEach(({ name }) => {
          if (name.includes('bankAccount')) {
            bankAccountErrors++;
          }
          if (
            name.includes('location') ||
            name.includes('skills') ||
            name.includes('phone') ||
            name.includes('taxpayerId') ||
            name.includes('pricePerWord')
          ) {
            pessoalDataErrors++;
          }
        });

        if (bankAccountErrors > pessoalDataErrors) {
          setActiveTab('bankAccount');
        }

        if (pessoalDataErrors > bankAccountErrors) {
          setActiveTab('personal');
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
          <Form.Item name={'avatarUrl'} hidden>
            <Input hidden />
          </Form.Item>
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
              {
                max: 255,
                message:
                  'o tamanho máximo do campo é 255 caracteres.',
              },
              {
                min: 10,
                message:
                  'o tamanho mínimo do campo é 10 caracteres.',
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
              {
                type: 'enum',
                enum: ['EDITOR', 'ASSISTANT', 'MANAGER'],
                message: `Perfil precisa ser Editor, Assistente ou Gerente`,
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
            activeKey={activeTab}
            defaultActiveKey='personal'
            onChange={(tab) =>
              setActiveTab(
                tab as 'personal' | 'bankAccount'
              )
            }
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
