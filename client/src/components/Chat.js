import React, {useState, useEffect, useRef, createRef } from 'react';
import {  Button, Form, Input, Space, List, Skeleton  } from 'antd';
import { useSubscription, useMutation } from '@apollo/client';
import { GET_CHAT, SEND_CHAT } from '../utils/mutations';

import Auth from '../utils/auth';

const Chat = () => {
    const [form] = Form.useForm();
    const [chats, setChats] = useState([]);
/*    const [subscription, { data, error }] = useSubscription(
      GET_CHAT,
      { variables: {} }
    ); 
*/
    

/*          // starts subscription to chat when component mounts
          useEffect(() => {
            subscription.start();
            return () => subscription.stop();
          }, []);
      
            // updates chats state when new chats are received
          useEffect(() => {
            if (data && data.chats){
              setChats([...chats, data.chatSent]);
            }
          }, [data]);
*/  
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

{/* 
<div>
      <ul>
        {chats.map((chat) => (
          <li>{chat.message} - {chat.user.username} @ {chat.createdAt}</li>
        ))}
      </ul>
    </div>
*/}
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