import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import "../css/pages/Profile.css";

export default function Profile() {
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                window.location.replace("/login?redirect=true");
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [user]);

    if (!user) return <div>Er du sikker på at du er logget inn?</div>;

    async function handleLogout() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
                withCredentials: true,
            })
            if (response.status === 200) {
                window.location.replace("/");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    
    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}