import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, loginWithGoogle, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        return unsub;
    }, []);

    return (
        <UserContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (ctx === undefined) {
        throw new Error("useUser must be used inside a UserProvider");
    }
    return ctx;
}
