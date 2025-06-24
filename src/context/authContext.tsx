import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import api from '../axios/Api';

interface AuthContextI{
    isAuthenticated: boolean;
    authUser: any;
    isEmailVerified: boolean;
    setIsEmailVerified: Dispatch<SetStateAction<boolean>>;
    checkAuth: () => void;
    authenticate: (authUser_p: any) => void;
    logout: () => void;
} 

const AuthContext = createContext<AuthContextI | null>(null);
export const useAuthContext = () => useContext(AuthContext); 

export const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {    

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<any>(null);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

    let isCheckingAuth = false;
    const checkAuth = async () => {

        if(!isCheckingAuth) {

            isCheckingAuth = true;

            await api.get('/auth/check').then((res:any) =>{
                isCheckingAuth = false;
                authenticate(res.data.user);
                setIsEmailVerified(res.data.isEmailVerified);
            })
            .catch(() => {
                isCheckingAuth = false;
                setAuthUser(null);
                setIsAuthenticated(false);
                setIsEmailVerified(false);
            });
        }
    };

    const authenticate = (authUser_p: any) => {
        setIsAuthenticated(true);
        setAuthUser(authUser_p);
    }

    const logout = () => {
        setAuthUser(null);
        setIsAuthenticated(false);
        setIsEmailVerified(false);
        window.location.href = "/auth";
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            authUser,
            isEmailVerified,
            setIsEmailVerified,
            checkAuth,
            authenticate,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};