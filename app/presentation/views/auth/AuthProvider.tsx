import {createContext, ReactNode, useEffect, useState} from "react";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";

type AuthContextType = {
    userSlug: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [userSlug, setUserSlug] = useState("");

    const {
        user,
        getUserSession
    } = UseUserLocalStorage()

    useEffect(() => {
        if (user !== undefined)
           setUserSlug(user.slug);
    }, [user]);

    return (
        <AuthContext.Provider value={{ userSlug }}>
            {children}
        </AuthContext.Provider>
    );
};