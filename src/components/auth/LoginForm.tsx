import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { TemporaryMessage } from '../temporaryMessages';
import { useAuthContext } from '../../context/authContext';
import { useTemporaryMessage } from '../../hooks/useTemporaryMesage';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate, setIsEmailVerified} = useAuthContext()!;

    const temporaryMessage = useTemporaryMessage();

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
            temporaryMessage.display("Welcome back!", "green");

            setTimeout(() => navigate("/"), 800);
        } else if (response.status === 404) {
            temporaryMessage.display("User was not found", "orangered");
        } else if (response.status === 401) {
            temporaryMessage.display("Invalid password", "orangered");
        } else if (password.length < 8) {
            temporaryMessage.display("Password is too short, insert 8 characters at least.", "orangered");
        } else {
            const data:any = await response.json();
            temporaryMessage.display(`Server error: ${data.error}`, "red");
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

            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
};

export default LoginForm;