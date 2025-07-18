import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFormStyles } from '../../styles/auth/authForm';
import { TemporaryMessage } from '../temporaryMessages';
import { useTemporaryMessage } from '../../hooks/useTemporaryMesage';
import { useAuthContext } from '../../context/authContext';
import { handleSignUp } from '../../formHandlers/handleSignUp';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const RegisterForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate} = useAuthContext()!;
    const styles = useAuthFormStyles();
    const temporaryMessage = useTemporaryMessage();


    return(
        <div className='base-container'>

            <div className="form-container" style={{backgroundImage:`url("/images/landscape1.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form className="auth-form" style={{backgroundColor:"brown"}} onSubmit={handleSignUp({authenticate, temporaryMessage, navigate})}>
                    <h2 className="auth-title">Create Account</h2>
                    <input name="username" type="text" placeholder="Username" required className="auth-input" />
                    <input name="email" type="email" placeholder="Email" required className="auth-input" />
                    <input name="password" type="password" placeholder="Password" required className="auth-input" />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" required className="auth-input" />
                    <button type="submit" className="auth-button">Register</button>
                    <hr style={{width:"100%", color:"white"}}></hr>
                    {children}
                </form>
            </div>

            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
};

export default RegisterForm;