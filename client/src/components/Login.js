import React, {useState} from 'react';
import {  Button, Form, Input  } from 'antd';

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
        <Form form={form} name="horizontal_login" layout="inline" onFinish={submitForm}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    )
};

export default Login;