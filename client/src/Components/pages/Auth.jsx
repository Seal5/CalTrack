import React, { useState } from "react";

export const Auth = () => {
    return <div className="auth"> 
        <Login />
        <Register />
    </div>;
}

const Login = () => {
    return <div></div>;
};

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="auth-container">
            <form>
                <h2> Register </h2>
                <div className="register">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" id="username" value={username} onChange={(event) =>  setUsername(event.target.value)}/>
                </div>
                <div className="register">
                    <label htmlFor="password"> Password: </label>
                    <input type="text" id="password" value={password} onChange={(event) =>  setPassword(event.target.value)}/>
                </div>
            </form>
        </div>
    );
};