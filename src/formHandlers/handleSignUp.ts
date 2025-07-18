import { handleSignUpParams } from "../schemas/signUpForm";


export const handleSignUp = ({authenticate, temporaryMessage, navigate}:handleSignUpParams) => 
    async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password === confirmPassword) {
            const response = await fetch('http://localhost:5000/auth/register' , {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password}),
                credentials: 'include' // Ensure cookies are sent with the request
            });

            if (response.status === 201) {
                // Save auth state in authentication context
                const responseData = await response.json();
                authenticate(responseData.user);
                temporaryMessage.display("Ready to start!", "green");
                setTimeout(() => {navigate("/")}, 800);
            } else if (response.status === 400) {
                temporaryMessage.display("Username or email already in use.", "orangered")               
            } else {
                const data:any = await response.json();
                temporaryMessage.display(`SignUp Error: ${response.status} | ${data.message}`, "red");
            }
        } else {
            temporaryMessage.display('Password fields must coincide.', "orangered")
        }
};