import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthFormStyles } from "../../styles/auth/authForm";

export default function AuthenticationView() {

    const styles = useAuthFormStyles();
    const [isNoAccountButtonHovered, setIsNoAccountButtonHovered] = useState<boolean>(false);
    const [isExistingAccountButtonHovered, setIsExistingAccountButtonHovered] = useState<boolean>(false);
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
                            <b><span style={{...styles.toggleFormsButton, ...(isExistingAccountButtonHovered && styles.toggleFormsButtonHover)}} onClick={toggleForm}  onMouseEnter={() => setIsExistingAccountButtonHovered(true)} onMouseLeave={() => setIsExistingAccountButtonHovered(false)}>I already have an account</span></b>
                        </RegisterForm>
                    </>
            )}
        </>
    );
};