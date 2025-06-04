import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { EmailVerificationFormProps } from "../../schemas/EmailVerificationForm";
import { sendEmailVerificationCode } from "../../utils/EmailVerification";

const EmailVerificationForm = ({setIsEmailVerified}:EmailVerificationFormProps) => {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const verificationCodeElementRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    //Place cursor in text area just after load page
    useEffect(() => {
            if(verificationCodeElementRef.current) verificationCodeElementRef.current.focus(); 
    }, []);

    if (verificationCode === "" || !verificationCode) {
        console.log("Insert a verification code")
    }

    const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("http://localhost:5000/auth/verifyEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({code:verificationCode}),
            credentials: "include"
        });

        if (!response.ok) {
            console.error("Failed to verify email with this code", verificationCode);
            alert("Invalid or expired code");
            setVerificationCode("");
            return;
        }

        console.log("Email verified successfully");
        setIsEmailVerified(true);
        <Navigate to="/" />
        
    }

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