import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'


export const Auth = () => {
    return (
    <div className="auth"> 
        <Login />
        <Register />
    </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });
            
            setCookies("acess_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    return (
      <div className="auth-container">
        <Form 
            username={username}
            setUsername={setUsername}
            setPassword={setPassword}
            title="Login"
            onSubmit={handleSubmit}
        />
      </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now you may login.");
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            title="Register"
            onSubmit={handleSubmit}
        />
    );
};

const Form  = ({ username, setUsername, password, setPassword, title, onSubmit}) => {
    return (
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2> {title} </h2>
          <div className= "namebox">
            <label htmlFor="username"> Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className= "namebox">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit"> {title} </button>
        </form>
      </div>
    );
};
