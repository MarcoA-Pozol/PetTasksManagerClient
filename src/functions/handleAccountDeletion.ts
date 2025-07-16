import api from "../axios/Api";

export const handleAccountDeletion = async (username:string, confirmationMessage:string) => {
    if (confirmationMessage === "") return alert("Fill the first field please.");
    if (confirmationMessage.toLowerCase() !== "i agree") return alert("Type ''I agree'' to accept your account deletion.");
    if (username === "") return alert("Fill the second field please.");

    await api.post("http://localhost:5000/users/deleteAccount", {username})
    .then(() => {
        alert(`Your account was deleted.`);
    })
    .catch((err) => {
        if (err.status === 400) {
            alert("Invalid username.");
        } else if (err.status === 401) {
            alert("Not authenticated.");
        } else {
            alert(`Unexpected error: ${err.response?.data?.error || err.message}`);
        }
    })
}