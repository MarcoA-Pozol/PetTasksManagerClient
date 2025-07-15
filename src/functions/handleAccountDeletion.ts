import api from "../axios/Api"

export const handleAccountDeletion = async (username:string) => {
    await api.post("http://localhost:5000/users/deleteAccount", {username})
    .then((res: any) => {
        alert(`Account was successfully deleted:${res.data.message?.res.data}`);
    })
    .catch((err) => {
        alert(`Error during trying to delete account: ${err.response?.data?.error || err.message}`);
    })
}