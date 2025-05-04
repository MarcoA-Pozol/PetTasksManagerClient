import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const LoginForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();

    const handleFormSubmision = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        // const password = formData.get("password") as string;

        localStorage.setItem('currentAuthUser', username);

        // Redirect to AppView
        navigate('/');
    };

    return(
        <div className='base-container'>

            <div className='form-left-container'>
                <form className="auth-form" onSubmit={handleFormSubmision}>
                    <h2 className="auth-title">Welcome Back!</h2>
                    <input type="text" placeholder="Username" required className="auth-input" />
                    <input type="password" placeholder="Password" required className="auth-input" />
                    <button type="submit" className="auth-button">Login</button>
                    {children}
                </form>
            </div>

            <div className='form-right-container'>
                <div>
                    <h3><strong style={{color:'rgb(225, 30,0)'}}>Productivity</strong>, enhancement and growing in only one place</h3>
                </div>
            </div>

        </div>
    );
};

export default LoginForm;