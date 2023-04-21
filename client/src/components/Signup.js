import React, {useState} from 'react';

function Signup() {
    const [user, setUser] = useState(null);
    const signUp = () => {};

    return (
        <div>
        <label>Signup:</label>
        <input placeholder="Username" onChange={(event) => {
            setUser({...user, username: event.target.value});
        }} />
        <input placeholder="Email" onChange={(event) => {
            setUser({...user, email: event.target.value});
        }} />
        <input placeholder="Password" type="password" onChange={(event) => {
            setUser({...user, password: event.target.value});
        }} />
        <button onClick={signUp}>Sign Up</button>
        </div>
    );
};

export default Signup;