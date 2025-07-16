import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/authForm.css';
import { TemporaryMessage } from '../temporaryMessages';
import { useTemporaryMessage } from '../../hooks/useTemporaryMesage';
import { useAuthContext } from '../../context/authContext';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const RegisterForm: React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();
    const {authenticate} = useAuthContext()!;

    const temporaryMessage = useTemporaryMessage();

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
                // Save auth state in authentication context
                const responseData = await response.json();
                authenticate(responseData.user);
                temporaryMessage.display("Ready to start!", "green");
                setTimeout(() => {navigate("/")}, 800);
            } else if (response.status === 500) {
                temporaryMessage.display("Username or email already in use.", "orangered")               
            } else {
                const data:any = await response.json();
                temporaryMessage.display(`SignUp Error: ${response.status} | ${data.message}`, "red");
            }
        } else {
            temporaryMessage.display('Password fields must coincide.', "orangered")
        }

    };

    return(
        <div className='base-container'>

            <div className="form-container" style={{backgroundImage:`url("/images/landscape1.png")`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <form className="auth-form" style={{backgroundColor:"brown"}} onSubmit={handleFormSubmision}>
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