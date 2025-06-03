import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

const EmailVerificationForm = () => {
    const [verificationCode, setVerificationCode] = useState<string>("");
    const verificationCodeElementRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
            //Place cursor in text area just after load page
            if(verificationCodeElementRef.current) verificationCodeElementRef.current.focus(); 
    }, []);

    if (verificationCode === "" || !verificationCode) {
        console.log("Insert a verification code")
    }

    const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("http://localhost:5000/verifyEmail/", {
            method: "POST",
            body: JSON.stringify(verificationCode),
            credentials: 'include'
        });

        if (!response.ok) {
            console.error("Failed to verify email with this code", verificationCode);
            setVerificationCode("");
            return;
        }

        console.log("Email verified successfully");
        <Navigate to="/auth" />
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
        </>
    );
}

export default EmailVerificationForm;