import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import { List } from 'antd';

import {GET_CHAT} from '../utils/mutations';

const OldChat = () => {

    const { data } = useQuery(GET_CHAT);

    if (data) {
        const chats = data?.chat;
        const array = [...chats].reverse().slice(0,20);
        const deepCopy = JSON.parse(JSON.stringify(array)); // array is a 'shallow copy' which is read-only
        deepCopy.forEach(item => {
            let date = new Date(item.createdAt*1); // ms timestamp needed to be passed as an integer? *1 hack worked dont ask how i got there
            item.createdAt = date.toLocaleTimeString(); // needed to create a 'deep copy' to edit this on the client-side
        })
        return (
            <List className="chatbox" itemLayout="hortizontal" height="200">
                {deepCopy.map((o, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta 
                            title={o.user.username}
                            description={o.createdAt}
                            />
                            <div className="chatcontent">{o.message}</div>
                    </List.Item>
                ))}
            </List>
        );
    }

       
};

export default OldChat;