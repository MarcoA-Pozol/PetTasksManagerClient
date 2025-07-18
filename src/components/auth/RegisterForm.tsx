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
        <div style={styles.baseContainer}>

            <div style={{...styles.formContainer, backgroundImage:`url("/images/landscape1.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form style={{...styles.authForm, backgroundColor:"brown"}} onSubmit={handleSignUp({authenticate, temporaryMessage, navigate})}>
                    <h2 style={styles.authTitle}>Create Account</h2>
                    <input style={styles.authInput} name="username" type="text" placeholder="Username" required/>
                    <input style={styles.authInput} name="email" type="email" placeholder="Email" required/>
                    <input style={styles.authInput} name="password" type="password" placeholder="Password" required/>
                    <input style={styles.authInput} name="confirmPassword" type="password" placeholder="Confirm Password" required/>
                    <button style={styles.authButton} type="submit">Register</button>
                    <hr style={{width:"100%", color:"white"}}></hr>
                    {children}
                </form>
            </div>

            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
};

export default RegisterForm;