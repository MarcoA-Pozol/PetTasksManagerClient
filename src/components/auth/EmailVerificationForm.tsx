import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { sendEmailVerificationCode } from "../../utils/EmailVerification";
import { useAuthContext } from "../../context/authContext";
import api from '../../axios/Api';


const EmailVerificationForm = () => {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const verificationCodeElementRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    
    //Get shared auth context
    const {isAuthenticated, isEmailVerified, setIsEmailVerified} = useAuthContext()!;

    //Place cursor in text area just after load page
    useEffect(() => {
            if(verificationCodeElementRef.current) verificationCodeElementRef.current.focus(); 
    }, []);

    if (verificationCode === "" || !verificationCode) {
        console.log("Insert a verification code")
    }


    
    let isVerifyingEmail = false;

    const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!isVerifyingEmail) {

            isVerifyingEmail = true;            
            api.post('/auth/verifyEmail', { code: verificationCode })
            .then(() => {

                isVerifyingEmail = false;

                console.log("Email verified successfully");
                setIsEmailVerified(true);
            })
            .catch(() => {

                isVerifyingEmail = false;

                console.error("Failed to verify email with this code", verificationCode);
                alert("Invalid or expired code");
                setVerificationCode("");
                return;
            });
        }
    }

    //Redirect to home page
    if(isAuthenticated && isEmailVerified) return <Navigate to="/"/>;

    //Re-place cursor in text area after submiting
    if (verificationCodeElementRef.current) verificationCodeElementRef.current.focus();

    return (
        <>
            <h2>Email Verification</h2>
            <p>Verify your email by entering the verification code down below</p>
            <form onSubmit={handleFormSubmission}>
                <label>
                    Code: 
                    <input type="text" placeholder={t("Verification Code")} ref={verificationCodeElementRef} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}></input>
                </label>
                <button type="submit">{t("Submit")}</button>
            </form>
            <p>Didn't receive the code? <b onClick={sendEmailVerificationCode} style={{cursor:"pointer"}}>Resend code</b></p>
        </>
    );
}

export default EmailVerificationForm;