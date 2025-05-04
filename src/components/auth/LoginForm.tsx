import React from 'react';
import '../../styles/auth/authForm.css';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {

    return(
        <>
            <form className="auth-form">
                <h2 className="auth-title">Welcome Back!</h2>
                <input type="email" placeholder="Email" required className="auth-input" />
                <input type="password" placeholder="Password" required className="auth-input" />
                <button type="submit" className="auth-button">Login</button>
                {children}
            </form>
        </>
    );
};

export default LoginForm;