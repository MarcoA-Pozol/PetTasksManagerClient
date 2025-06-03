

const EmailVerificationForm = () => {

    return (
        <>
            <h2>Email Verification</h2>
            <p>Verify your email by entering the verification code down below</p>
            <form>
                <label>
                    Code: 
                    <input type="text"></input>
                </label>
            </form>
        </>
    );
}

export default EmailVerificationForm;