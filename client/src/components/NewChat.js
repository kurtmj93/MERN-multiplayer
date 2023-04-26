import React, {useEffect, useState} from 'react';
import {useSubscription} from '@apollo/client';
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
    
    if (chats) {
        return (
            <ul>
                {chats.map((o) => (
                    <li key={o.id}>{o.message} - sent by {o.username} at {o.createdAt}</li>
                ))}
            </ul>
        )
    };
};

export default NewChat;