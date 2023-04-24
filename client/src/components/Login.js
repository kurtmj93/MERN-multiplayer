import React, {useState} from 'react';
import {  Button, Form, Input, Space  } from 'antd';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';


const Login = () => {
    const [form] = Form.useForm();
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [login, {error}] = useMutation(LOGIN_USER);
    const submitForm = async (values) => {
        try {
            const {data} = await login({
                variables: values
            });
        
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({ // (reset after submission)
            username: '',
            password: ''
        });
    };
    return (
      <div><h2>Login</h2>
      <Form
      form={form}
  name="login"
  style={{
    maxWidth: 600,
  }}
  onFinish={submitForm}
  autoComplete="off"
>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Space>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }>
              Log in
            </Button>
          )}
        </Form.Item>
        <Form.Item>
            <Button
              type="ghost" href="/signup">
                Create an account
            </Button>
        </Form.Item>
        </Space>
      </Form>
    </div>
    )
};

export default Login;