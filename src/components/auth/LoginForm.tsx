import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { SuccessMessage, WarningMessage, ErrorMessage } from '../temporaryMessages';
import { useAuthContext } from '../../context/authContext';
import { useTemporaryMessage } from '../../hooks/useTemporaryMesage';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate, setIsEmailVerified} = useAuthContext()!;

    const successMsg = useTemporaryMessage();
    const warningMsg = useTemporaryMessage();
    const userNotFoundMsg = useTemporaryMessage();
    const unauthorizedMsg = useTemporaryMessage();
    const errorMsg = useTemporaryMessage();

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
            // Save auth state in authentication context
            const responseData = await response.json();
            authenticate(responseData.user);
            setIsEmailVerified(responseData.isEmailVerified);
            successMsg.display("Welcome back!");

            setTimeout(() => navigate("/"), 800);
        } else if (response.status === 404) {
            userNotFoundMsg.display("User was not found");
        } else if (response.status === 401) {
            unauthorizedMsg.display("Invalid password");
        } else if (password.length < 8) {
            warningMsg.display("Password is too short, insert 8 characters at least.");
        } else {
            const data:any = await response.json();
            console.log(data);
            errorMsg.display(`Server error: ${data.error}`);
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

            {successMsg.show && <SuccessMessage message={successMsg.text}/>}
            {userNotFoundMsg.show && <WarningMessage message={userNotFoundMsg.text}/>}
            {unauthorizedMsg.show && <WarningMessage message={unauthorizedMsg.text}/>}
            {warningMsg.show && <WarningMessage message={warningMsg.text}/>}
            {errorMsg.show && <ErrorMessage message={errorMsg.text}/>}

        </div>
    );
};

export default LoginForm;