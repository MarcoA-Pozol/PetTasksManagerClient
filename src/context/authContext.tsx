import { createContext, useContext, useState } from "react";
import api from '../axios/Api';

interface AuthContextI{
    isAuthenticated: boolean | null;
    authUser: any;
    checkAuth: () => void;
} 

const AuthContext = createContext<AuthContextI | null>(null);
export const useAuthContext = () => useContext(AuthContext); 

export const AuthProvider = ({children}:React.PropsWithChildren<{}>) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [authUser, setAuthUser] = useState<any>(null);

    const checkAuth = () => {
    
        api.get('/auth/check')
        .then((response:any) => {
            setAuthUser(response?.data.user);
            setIsAuthenticated(true);
        })
        .catch(() => {
            setAuthUser(null);
            setIsAuthenticated(false);
        });
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, authUser, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};