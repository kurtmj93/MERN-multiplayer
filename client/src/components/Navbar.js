import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Auth from '../utils/auth';

import {useMutation} from '@apollo/client';
import {LOGOUT_USER} from '../utils/mutations'; 

const Navbar = () => {
    const [logout, {error}] = useMutation(LOGOUT_USER);
    const logoutFunc = async () => {
        try {
            const profile = Auth.getProfile();
            const id = profile.data._id;
            console.log(id);
            await logout({variables: { userId: id }});
        } catch (err) {
            console.error(err);
        }
        Auth.logout();
    }

    let loc = window.location.href.split('/')[3];
    const [current, setCurrent] = useState(!loc ? 'home' : loc);
    
    const onClick = (e) => {
        setCurrent(e.key);
    };

    // MENU ITEMS

    
const loggedInItems = [
    {
        key: 'home',
        label: (
            <Link to='/'>Home</Link>
        )
    },
    { 
        ket: 'chat',
        label: (
            <Link to='/chat'>Chat</Link>
        )
    },
    {
        key: 'logout',
        label: (
            <Link onClick={logoutFunc}>Logout</Link>
        )
    }
];

const loggedOutItems = [
    {
        key: 'home',
        label: (
            <Link to='/'>Home</Link>
        )
    },
    {
        key: 'login',
        label: (
            <Link to='/login'>Login</Link>
        )
    },
    {
        key: 'signup',
        label: (
            <Link to='/signup'>Signup</Link>
        )
    },
]

    
    return (
        <>
        { Auth.loggedIn() ? ( 
            <Menu onClick={onClick} theme="light" selectedKeys={[current]} mode="vertical" items={loggedInItems}/> 
            ) : (
            <Menu onClick={onClick} theme="light" selectedKeys={[current]} mode="vertical" items={loggedOutItems}/>
        )}
        </>
    );
};

export default Navbar;