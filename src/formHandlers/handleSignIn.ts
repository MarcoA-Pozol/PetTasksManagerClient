import { handleSignInParams } from "../schemas/signInForm";

export const handleSignIn = ({ authenticate, setIsEmailVerified, temporaryMessage, navigate }: handleSignInParams) =>
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const input = formData.get("input") as string;
    const password = formData.get("password") as string;

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, password }),
      credentials: "include",
    });

    if (response.ok) {
      const responseData = await response.json();
      authenticate(responseData.user);
      setIsEmailVerified(responseData.isEmailVerified);
      temporaryMessage.display("Welcome back!", "green");

      setTimeout(() => navigate("/"), 800);
    } else if (response.status === 404) {
      temporaryMessage.display("User was not found", "orangered");
    } else if (response.status === 401) {
      temporaryMessage.display("Invalid password", "orangered");
    } else if (password.length < 8) {
      temporaryMessage.display("Password is too short, insert 8 characters at least.", "orangered");
    } else {
      const data: any = await response.json();
      temporaryMessage.display(`Server error: ${data.error}`, "red");
    }
};
