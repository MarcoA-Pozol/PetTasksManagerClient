import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import loginStainImg from '../../assets/login_stain_img.png';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
    handleAccessToken: (accessToken: string) => void;
}


const LoginForm: React.FC<Props> = ({children, handleAccessToken}:Props) => {
    
    const navigate = useNavigate();


    const handleFormSubmision = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const input = formData.get("input") as string;
        const password = formData.get("password") as string;

        
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input, password}),
            credentials: 'include' // For JWT authorization
        });

        if (response.ok) {

            //get and store access token in use state context
            const data = await response.json();
            const accessToken = data.token;
            handleAccessToken(accessToken);

            navigate("/", {state: {accessToken}});

        } else {
            alert("Invalid credentials.");
        }
    };

    return(
        <div className='base-container'>

            <div className='form-left-container'>
                <form className="auth-form" onSubmit={handleFormSubmision}>
                    <h2 className="auth-title">Welcome Back!</h2>
                    <input name="input" type="text" placeholder="Username / Email" required className="auth-input" />
                    <input name="password" type="password" placeholder="Password" required className="auth-input" />
                    <button type="submit" className="auth-button">Login</button>
                    {children}
                </form>
            </div>

            <div className='form-right-container'>
                <img src={loginStainImg} alt='Login stain img'></img>
            </div>

        </div>
    );
};

export default LoginForm;