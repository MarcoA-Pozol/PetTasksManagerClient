import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { SuccessMessage, WarningMessage, ErrorMessage } from '../temporaryMessages';
import { useAuthContext } from '../../context/authContext';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate, setIsEmailVerified} = useAuthContext()!;

    const [temporaryMessageText, setTemporaryMessageText] = useState<string>("");
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [showUserDoesNotExistsMessage, setShowUserDoesNotExistsMessage] = useState<boolean>(false);
    const [showUnauthorizedMessage, setShowUnauthorizedMessage] = useState<boolean>(false);

    const handleFormSubmision = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const input = formData.get("input") as string;
        const password = formData.get("password") as string;

        
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input, password}),
            credentials: 'include',
        });

        if (response.ok) {
            setTemporaryMessageText("SignIn was successful");
            setShowSuccessMessage(true);

            // Save auth state in authentication context
            const responseData = await response.json();
            authenticate(responseData.user);
            setIsEmailVerified(responseData.isEmailVerified);

            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate("/");
            }, 2000);
        } else if (response.status === 404) {
            setTemporaryMessageText("User was not found");
            setShowUserDoesNotExistsMessage(true);
            setTimeout(() => {
                setShowUserDoesNotExistsMessage(false);
            }, 2000);
        } else if (response.status === 401) {
            setTemporaryMessageText("Invalid password");
            setShowUnauthorizedMessage(true);
            setTimeout(() => {
                setShowUnauthorizedMessage(false);
            }, 2000);
        } else {
            const data:any = await response.json();
            setTemporaryMessageText(`Server error ocurred: ${data}`);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
        }
    };

    return(
        <div className='base-container'>

            <div className="form-container" style={{backgroundImage:`url("/images/landscape5.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form className="auth-form" style={{backgroundColor:"rgba(70, 10, 120, .6)"}} onSubmit={handleFormSubmision}>
                    <h2 className="auth-title">Welcome Back!</h2>
                    <input name="input" type="text" placeholder="Username / Email" required className="auth-input" />
                    <input name="password" type="password" placeholder="Password" required className="auth-input" />
                    <button type="submit" className="auth-button">Continue</button>
                    <hr style={{width:"100%", color:"white"}}></hr>
                    <span className="forgot-password-button">I forgot my password</span>
                    {children}
                </form>
            </div>

                {showSuccessMessage && (
                    <SuccessMessage message={temporaryMessageText}/>
                )}

                {showUserDoesNotExistsMessage && (
                    <WarningMessage message={temporaryMessageText}/>
                )}

                {showUnauthorizedMessage && (
                    <WarningMessage message={temporaryMessageText}/>
                )}

                {showErrorMessage && (
                    <ErrorMessage message={temporaryMessageText}/>
                )}

        </div>
    );
};

export default LoginForm;