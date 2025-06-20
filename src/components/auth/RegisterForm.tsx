import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { SuccessMessage, WarningMessage, ErrorMessage, CustomMessage } from '../temporaryMessages';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const RegisterForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();

    const handleFormSubmision = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password === confirmPassword) {
            const response = await fetch('http://localhost:5000/auth/register' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password}),
                credentials: 'include' // Ensure cookies are sent with the request
            });

            if (response.status === 201) {
                navigate("/");
            } else {
                const data:any = await response.json();
                alert(`SignUp Error: ${response.status} | ${data.message}`);
            }
        } else {
            alert('Password fields must coincide.')
        }

    };

    return(
        <div className='base-container'>

            <div className="form-container" style={{backgroundImage:`url("/images/landscape3.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form className="auth-form" style={{backgroundColor:"darkslateblue"}} onSubmit={handleFormSubmision}>
                    <SuccessMessage message="Juan"/>
                    <WarningMessage message="Juan"/>
                    <ErrorMessage message="Juan"/>
                    <CustomMessage message="Juan" backgroundColor="royalblue" color="white"/>
                    <CustomMessage/>
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
        </div>
    );
};

export default RegisterForm;