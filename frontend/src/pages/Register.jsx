import "../css/components/Form.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const { user } = useContext(AuthContext);

    if (user) window.location.href = "/profile";

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        { email, password, repeatPassword, userName },
        { withCredentials: true }
        )
        .then((response) => {
            setMsg(response.data.msg);
            setMsgType("success");
            setTimeout(() => {
            if (response.status === 201) {
                window.location.replace("/profile");
            }
            }, 1000);
        })
        .catch((error) => {
            if (error.response) {
            setMsg(error.response.data.msg);
            setMsgType("error");
            } else {
            setMsg("An error occurred. Please try again later.");
            setMsgType("error");
            }
        });
    }
    return (
        <div className="form-container-container">

        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                />
                <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        <div className={`feedback ${msgType}`}>
            <p>{msg}</p>
        </div>

        </div>
        </div>
    )
}
