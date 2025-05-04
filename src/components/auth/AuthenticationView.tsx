import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthenticationView() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const toggleForm = () => {
        // Toggle between displaying login and register formularies
        setIsLoginVisible((prev) => !prev);
    };

    return (
        <>
            {isLoginVisible ? (
                    <>
                        <LoginForm/>
                        <br></br>
                        <span id="no-account-button" onClick={toggleForm}>I do not have an account yet</span>
                    </>
                    
                ): (
                    <>
                        <RegisterForm/>
                        <br></br>
                        <span id="existing-account-button" onClick={toggleForm}>I already have an account</span>
                    </>
            )}
        </>
    );
};