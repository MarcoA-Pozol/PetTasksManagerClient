import '../../styles/auth/authForm.css';
import registerStainImage from '../../assets/login_stain_img.png';

type Props = {
    children?: React.ReactNode; // Can accept another html elements or react components
}

const RegisterForm: React.FC<Props> = ({children}:Props) => {

    return(
        <div className='base-container'>
            <div className='form-left-container'>
                <form className="auth-form">
                    <h2 className="auth-title">Create Account</h2>
                    <input type="text" placeholder="Username" required className="auth-input" />
                    <input type="email" placeholder="Email" required className="auth-input" />
                    <input type="password" placeholder="Password" required className="auth-input" />
                    <input type="password" placeholder="Confirm Password" required className="auth-input" />
                    <button type="submit" className="auth-button">Register</button>
                    {children}
                </form>
            </div>

            <div className='form-right-container'>
                <img src={registerStainImage} alt='Login stain img'></img>
            </div>
        </div>
    );
};

export default RegisterForm;