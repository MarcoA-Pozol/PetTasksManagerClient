import api from '../axios/Api';

export const sendEmailVerificationCode = async () => {

    api.post('/auth/sendEmailVerificationCode', {}, {withCredentials: true})
    .then(() => {
        
        alert("Verification code was sent to your email");
    })
    .catch((err) => {
        alert(`Error on send email verification code: ${err}`);          
    });
}



interface checkIsEmailVerifiedProps {
    setIsEmailVerified:React.Dispatch<React.SetStateAction<boolean>>;
}

export const checkIsEmailVerified = async ({setIsEmailVerified}:checkIsEmailVerifiedProps) => {

    api.post('/auth/checkIsEmailVerified', {}, {withCredentials: true})
    .then(() => {
        
        setIsEmailVerified(true);
    })
    .catch(() => {
        setIsEmailVerified(false);
        return;         
    });
}