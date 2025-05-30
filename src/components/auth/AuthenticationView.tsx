import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthenticationView() {
    
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    //Access token
    const [accessToken, setAccessToken] = useState<string>("");

    const handleAccessToken = (accessToken: string) => {
        setAccessToken(accessToken);
    };


    const toggleForm = () => {
        // Toggle between displaying login and register formularies
        setIsLoginVisible((prev) => !prev);
    };


    return (
        <>
            {isLoginVisible ? (
                    <>
                        <LoginForm handleAccessToken={handleAccessToken}>
                            <b><span className='toggle-forms-button' onClick={toggleForm}>I do not have an account yet</span></b>
                        </LoginForm>
                    </>
                    
                ): (
                    <>
                        <RegisterForm>
                            <b><span className='toggle-forms-button' onClick={toggleForm}>I already have an account</span></b>
                        </RegisterForm>
                    </>
            )}
        </>
    );
};