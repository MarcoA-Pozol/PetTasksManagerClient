export const sendEmailVerificationCode = async () => {
    const response = await fetch('http://localhost:5000/auth/sendEmailVerificationCode' , {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    if (!response.ok) {
        alert(`Error on send email verification code: ${response.json}`);
    }

    alert("Verification code was sent to your email");
}

interface checkIsEmailVerifiedProps {
    setIsEmailVerified:React.Dispatch<React.SetStateAction<boolean | null>>;
}
export const checkIsEmailVerified = async ({setIsEmailVerified}:checkIsEmailVerifiedProps) => {
    try {

        const response = await fetch("http://localhost:5000/auth/checkIsEmailVerified", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        if (!response.ok) {
            setIsEmailVerified(false);
            return;
        }
     
        setIsEmailVerified(true);
    
    } catch (err) {
        setIsEmailVerified(false);
        console.error("Error during fetching tasks for this user:", err);
    };
}