import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import api from '../axios/Api';

interface AuthContextI{
    isAuthenticated: boolean;
    authUser: any;
    authUserUsername: string;
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
    const [authUserUsername, setAuthUserUsername] = useState<string>("");

    let isCheckingAuth = false;
    const checkAuth = async () => {

        if(!isCheckingAuth) {

            isCheckingAuth = true;

            await api.get('/auth/check').then((res:any) =>{
                isCheckingAuth = false;
                authenticate(res.data.user);
                setIsEmailVerified(res.data.isEmailVerified);
                setAuthUserUsername(res.data.user.username);
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
        setAuthUserUsername(authUser_p.username)
    }

    const logout = async () => {

        await api.post('http://localhost:5000/auth/logout').then(() => {
            setAuthUser(null);
            setIsAuthenticated(false);
            setIsEmailVerified(false);
            setAuthUserUsername("");
            window.location.href = "/auth";
        });
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            authUser,
            authUserUsername,
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