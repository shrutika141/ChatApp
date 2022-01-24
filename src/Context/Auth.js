import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Config";

import Loading from "../Components/Loading/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        onAuthStateChanged(auth, (e) => {
        setUser(e);
        setLoading(false);
        });

    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;