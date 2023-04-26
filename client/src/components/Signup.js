import React, {useState} from 'react';
import { Button, Form, Input, Space } from 'antd';

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
    <div><h2>Signup</h2>
        <Form
        form={form}
    name="signup"
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
      <Input showCount maxLength={10} />
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
  <Space>
    <Form.Item shouldUpdate>
    {() => (
      <Button type="primary" 
      htmlType="submit"
      disabled={
        !form.isFieldsTouched(true) ||
        !!form.getFieldsError().filter(({ errors }) => errors.length).length
      }>
        Create Account
      </Button>
    )}
    </Form.Item>
    <Form.Item>
            <Button
              type="ghost" href="/login">
                Login instead
            </Button>
    </Form.Item>
  </Space>
  </Form>
  </div>
    );
};

export default Signup;