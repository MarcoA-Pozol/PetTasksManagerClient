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