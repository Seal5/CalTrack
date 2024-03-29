import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import Footer from "../mainComp/Footer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const Auth = () => {
    return (
    <div className="auth"> 
        <Login />
        <Register />
    </div>
    );
};

// login authentication 
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()
    
    // handling submit 
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
          const response = await axios.post(
            "https://caltrack-backend.onrender.com/auth/login",
            {
              username,
              password,
            }
          );
          // appropriate error checks
          if (username == "" || password == "") {
            alert("Fill in all the fields before submitting");
            setUsername("");
            setPassword("");
          } else if (response.data.message) {
            setUsername("");
            setPassword("");
            alert(response.data.message);
          } else {
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
          }
        } catch (err) {
            console.error(err)
        }
    }
    return (
      <div className="auth-container">
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            title="Login"
            onSubmit={handleSubmit}
        />
      </div>
    );
};

// registeration authentication 
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(
          "https://caltrack-backend.onrender.com/auth/register",
          {
            username,
            password,
          }
        );
        // appropriate error checks
        if (username == "" || password == ""){
          alert("Fill in all the fields before submitting");
          setUsername("");
          setPassword("");
        } else if (response.data.message === "User already exists") {
          alert("User Already Created");
          setUsername("");
          setPassword("");
        } else {
          alert("Registration Completed! Now you may login.");
          setUsername("");
          setPassword("");
        }
    } catch (err) {
      console.error(err);
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
          <div className="namebox">
              <label htmlFor="password"> Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="namebox">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit"> Submit <ArrowUpwardIcon/>  </button>
        </form>
        <Footer/>
      </div>
    );
};
