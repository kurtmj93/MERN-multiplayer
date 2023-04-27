import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_ACTIVE} from '../utils/mutations';

const ActiveUsers = () => {
    const { data } = useQuery(GET_ACTIVE);
    if (data) {
        const users = data?.activeUsers;
        return (
            <ul>
                {users.map((o, index) => (
                <li key ="{index}">{o.username}</li>
                ))}
            </ul>
        );
    }

       
};

export default ActiveUsers;