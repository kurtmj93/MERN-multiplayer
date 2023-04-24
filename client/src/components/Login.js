import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
        <label>Login!</label>
        <input placeholder="Username" onChange={(event) => {
            setUsername(event.target.value);
        }} />
        <input placeholder="Password" type="password" onChange={(event) => {
            setPassword(event.target.value);
        }} />
        <button>Login</button>
        </div>
    )
};

export default Login;