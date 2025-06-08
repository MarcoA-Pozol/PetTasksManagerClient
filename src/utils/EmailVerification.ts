import api from '../axios/Api';

export const sendEmailVerificationCode = async () => {

    api.post('/auth/sendEmailVerificationCode', {}, {withCredentials: true})
    .then(() => {
        
        alert("Verification code was sent to your email");
    })
    .catch((err) => {
        alert(`Error on send email verification code: ${err.response.data.message}`);          
    });
}


interface checkIsEmailVerifiedProps {
    setIsEmailVerified:React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const checkIsEmailVerified = async ({setIsEmailVerified}:checkIsEmailVerifiedProps) => {
    try {

        api.post('/auth/checkIsEmailVerified', {}, {withCredentials: true})
        .then(() => {

            setIsEmailVerified(true);
        })
        .catch(() => {
            setIsEmailVerified(false);
            return;         
        });

    } catch (err) {
        setIsEmailVerified(false);
        console.error("Error on checkIsEmailVerified: ", err);
    };
}