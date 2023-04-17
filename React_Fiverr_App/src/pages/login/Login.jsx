import React, { useState } from "react";
import "./Login.scss";
import {Link} from "react-router-dom";
import newRequest from "../../../utils/newRequest.js";
import {useNavigate} from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post("/auth/login", { username, password });
            //set localStorage
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/")

        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                 <span>You don't have account</span>
                <Link to="/register" className="signUp">
                    <span className="text">Create account now!</span>
                </Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;