import React, {useEffect, useState} from 'react';
import {useSubscription} from '@apollo/client';
import { List } from 'antd';

import {SUBSCRIBE_CHAT} from '../utils/mutations';

const NewChat = () => {
    const { data } = useSubscription(SUBSCRIBE_CHAT);
    const [ chats, setChats ] = useState([]);

    useEffect(() => {
      if (data && data.chatSent) {
        setChats([...chats, {
            id: data.chatSent._id,
            message: data.chatSent.message,
            username: data.chatSent.user.username,
            createdAt: data.chatSent.createdAt
        }]);
    }}, [data]);

        return (
            <List className="chatbox" itemLayout="hortizontal" height="200">
                {[...chats].reverse().map((o, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta
                            title={o.username}
                            description={o.createdAt}
                            />
                            <div className="chatcontent">{o.message}</div>
                    </List.Item>
                ))}
            </List>
        );
};

export default NewChat;