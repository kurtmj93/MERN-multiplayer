import React, {useState} from 'react';
import { Button, Form, Input } from 'antd';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [form] = Form.useForm();
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: ''});
    const [addUser, { error }] = useMutation(ADD_USER);

    const submissionFailed = (err) => {
        console.error(err);
    };

    const submitForm = async (values) => {
        console.log(values);
        try {
            const {data} = await addUser({
                variables: values});

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({ // (reset after submission)
            username: '',
            email: '',
            password: ''
        });
    }

    return (
        <Form
        form={form}
    name="signup"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    onFinish={submitForm}
    onFinishFailed={submissionFailed}
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input a valid email!',
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

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    );
};

export default Signup;