import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Auth from '../utils/auth';

const navItems = [
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
];

const Navbar = () => {
    let loc = window.location.href.split('/')[3];
    const [current, setCurrent] = useState(!loc ? 'home' : loc);
    
    const onClick = (e) => {
        setCurrent(e.key);
    };
    
    return (
        <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={navItems}/>
    );
};

export default Navbar;