import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {

    const handleFormSubmision = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        localStorage.setItem('currentAuthUser', username);

        // Redirect to AppView
        const navigate = useNavigate();
        navigate('/');
    };

    return(
        <>
            <form className="auth-form" onSubmit={handleFormSubmision}>
                <h2 className="auth-title">Welcome Back!</h2>
                <input type="text" placeholder="Username" required className="auth-input" />
                <input type="password" placeholder="Password" required className="auth-input" />
                <button type="submit" className="auth-button">Login</button>
                {children}
            </form>
        </>
    );
};

export default LoginForm;