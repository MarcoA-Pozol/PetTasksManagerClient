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