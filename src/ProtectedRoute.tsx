import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { expiredTokenInterceptor } from "./axios/Api";
import EmailVerificationForm from "./components/auth/EmailVerificationForm";

interface PropsWithChildren {
    children: ReactNode;
}

export const ProtectedRoute = ({children}:PropsWithChildren) => {

    // Start loading auth context data
    const {isAuthenticated, checkAuth, isEmailVerified} = useAuthContext()!;
    const [isLoadingAuthContext, setIsLoadingAuthContext] = useState<boolean>(true);
 
    // Include incerceptors
    expiredTokenInterceptor();
    
    useEffect(() => {
        
        // On page refresh, check auth (and email verified status) since react contexts reset on refreshs
        if(!isAuthenticated || !isEmailVerified) checkAuth();

        // Delay (ms) to complete the auth context loading
        const timer = setTimeout(() => setIsLoadingAuthContext(false), 1000);

        // Clear timer in case component is ummounted (redirection to other page, for example) 
        return () => {
            //Actually, this executes first time while delay is still happening, however
            //once it finishes, it executes this again... (?)
            clearTimeout(timer);};
    }, []);


    return (isLoadingAuthContext) ? <div>Loading...</div>
    : (!isAuthenticated) ? <Navigate to="/auth"/>
    : (!isEmailVerified) ? <EmailVerificationForm/>
    : <>{children}</>;
};