import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Login from './Login';
import Auth from '../utils/auth';

const loggedInItems = [
    {
        key: 'home',
        label: (
            <Link to='/'>Home</Link>
        )
    },
    {
        key: 'logout',
        label: (
            <Link onClick={Auth.logout}>Logout</Link>
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

const Navbar = () => {
    let loc = window.location.href.split('/')[3];
    const [current, setCurrent] = useState(!loc ? 'home' : loc);
    
    const onClick = (e) => {
        setCurrent(e.key);
    };
    
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