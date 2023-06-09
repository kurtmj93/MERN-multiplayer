import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { useMutation } from '@apollo/client';
import { SEND_CHAT } from '../utils/mutations';

import Auth from '../utils/auth';
import NewChat from './NewChat';
import OldChat from './OldChat';
import ActiveUsers from './ActiveUsers';


const Chat = () => {
    const [form] = Form.useForm();
    const [sendChat, { error }] = useMutation(SEND_CHAT);
    const submitForm = async (values) => {
        try {
          const profile = Auth.getProfile();
          const id = profile.data._id;
          await sendChat({
            variables: {
              message: values.message,
              userId: id
          }
          });
        } catch (err) {
          console.error(err);
        }
        form.resetFields();
    };

    return (
<div><h2>Chat</h2>

<div>Active Users: <ActiveUsers/></div>

<Form form={form}
  name="chat"
  layout="inline"
  onFinish={submitForm}
  autoComplete="off"
>

        <Form.Item
          name="message"
          rules={[
            {
              required: true,
              message: 'Input a chat!',
            }
          ]}
        >
          <Input showCount maxLength={140} />
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

</Form>

<NewChat />
<OldChat />
</div>

)
};

export default Chat;