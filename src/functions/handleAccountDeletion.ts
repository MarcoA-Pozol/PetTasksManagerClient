import api from "../axios/Api"

export const handleAccountDeletion = async (username:string) => {
    await api.post("http://localhost:5000/users/deleteAccount", {username})
    .then(() => {
        alert(`Your account was deleted.`);
    })
    .catch((err) => {
        if (err.status === 404) {
            alert("This username was not found.")
        } else if (err.status === 401) {
            alert("Not authenticated.");
        } else {
            alert(`Unexpected error: ${err.response?.data?.error || err.message}`);
        }
    })
}