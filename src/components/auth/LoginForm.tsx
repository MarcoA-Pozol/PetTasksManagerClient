import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { TemporaryMessage } from '../temporaryMessages';
import { useAuthContext } from '../../context/authContext';
import { useTemporaryMessage } from '../../hooks/useTemporaryMesage';
import { handleSignIn } from '../../formHandlers/handleSignIn';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate, setIsEmailVerified} = useAuthContext()!;

    const temporaryMessage = useTemporaryMessage();
    
    return(
        <div className='base-container'>

            <div className="form-container" style={{backgroundImage:`url("/images/landscape5.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form className="auth-form" style={{backgroundColor:"rgba(70, 10, 120, .6)"}} onSubmit={handleSignIn({authenticate, setIsEmailVerified, temporaryMessage, navigate})}>
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