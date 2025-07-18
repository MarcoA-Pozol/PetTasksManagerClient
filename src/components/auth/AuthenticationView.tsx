import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthFormStyles } from "../../styles/auth/authForm";

export default function AuthenticationView() {

    const styles = useAuthFormStyles();
    const [isNoAccountButtonHovered, setIsNoAccountButtonHovered] = useState<boolean>(false);
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const toggleForm = () => {
        setIsLoginVisible((prev) => !prev);
    };


    return (
        <>
            {isLoginVisible ? (
                    <>
                        <LoginForm>
                            <b><span style={{...styles.toggleFormsButton, ...(isNoAccountButtonHovered && styles.toggleFormsButtonHover)}} onClick={(toggleForm)} onMouseEnter={() => setIsNoAccountButtonHovered(true)} onMouseLeave={() => setIsNoAccountButtonHovered(false)}>I do not have an account yet</span></b>
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