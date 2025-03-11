import "../css/components/Form.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirected = queryParams.get("redirected") === "true";

    useEffect(() => {
        if (redirected) {
            setMsg("You have to log in to view this site.");
            setMsgType("info");
        }
    }, [redirected]);

    useEffect(() => {
        if (user) window.location.href = "/profile";
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
        )
        .then((response) => {
            setMsg(response.data.msg);
            setMsgType("success");
            setTimeout(() => {
            if (response.status === 202) {
                window.location.href = "/profile";
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
                <h1>Logg inn</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {msg && (
                    <div className={`feedback ${msgType}`}>
                        <p>{msg}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
