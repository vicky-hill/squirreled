import { createContext, useState, useEffect } from "react"
import { auth } from '@/utils/firebase'
import api from "@/utils/api"

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserSession();
    }, [])

    /** Check user session and get current user */
    const checkUserSession = async () => {
        try {
            const user = await api.get('user');

            const unsubscribe = auth.onAuthStateChanged(() => {
                unsubscribe();
            });

            user && setCurrentUser(user);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    /** @param payload: { _id, email } */
    const register = async (payload) => {
        try {
            const user = await api.post('user', payload);
            setCurrentUser(user);
        } catch (err) {
            console.log(err);
        }
    }

    /** Logout */
    const logout = () => {
        auth.signOut();
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    const value = {
        logout,
        loading,
        register,
        currentUser,
        checkUserSession
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;