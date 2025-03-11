import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
                    withCredentials: true,
                    timeout: 1500, 
                });

                setUser(response.data.user);
            } catch (error) {
                console.error("ERROR AUTH:", error);
                setUser(null);
            } finally {
                setLoading(false);
                if (!user) {
                    return null;
                }
                return;
            }
        };

        fetchUser();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;