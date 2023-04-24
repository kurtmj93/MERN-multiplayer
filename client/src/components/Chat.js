import React, {useState} from 'react';
import {  Button, Form, Input, Space  } from 'antd';

const Chat = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const submitForm = (message) => {
        setMessage(''); // reset after submission
    };
    return (
<div><h2>Chat</h2>
<Form form={form}
  name="chat"
  style={{
    maxWidth: 600,
  }}
  onFinish={submitForm}
  autoComplete="off"
>
    <Space>
        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Input a chat!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate>
            {() => (
                <Button
                type="primary"
                htmlType="submit"
                disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors}) => errors.length).length
                }>
                    Send
                </Button>
            )}
        </Form.Item>
    </Space>
</Form>
</div>
)
};

export default Chat;