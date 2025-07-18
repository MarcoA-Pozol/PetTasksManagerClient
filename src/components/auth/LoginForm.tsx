import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFormStyles } from '../../styles/auth/authForm';
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
    const styles = useAuthFormStyles();
    const temporaryMessage = useTemporaryMessage();
    
    return(
        <div style={styles.baseContainer}>

            <div style={{...styles.formContainer, backgroundImage:`url("/images/landscape5.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form style={{...styles.authForm, backgroundColor:"rgba(70, 10, 120, .6)"}} onSubmit={handleSignIn({authenticate, setIsEmailVerified, temporaryMessage, navigate})}>
                    <h2 style={styles.authTitle}>Welcome Back!</h2>
                    <input name="input" type="text" placeholder="Username / Email" required style={styles.authInput} />
                    <input name="password" type="password" placeholder="Password" required style={styles.authInput} />
                    <button type="submit" style={styles.authButton}>Continue</button>
                    <hr style={{width:"100%", color:"white"}}></hr>
                    <span style={styles.forgotPasswordButton}>I forgot my password</span>
                    {children}
                </form>
            </div>

            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
};

export default LoginForm;