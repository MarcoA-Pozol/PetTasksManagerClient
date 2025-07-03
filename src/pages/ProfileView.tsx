import { useNavigate } from "react-router-dom"

export const ProfileView = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>This is the user profile</h2>
            <h3 onClick={() => {navigate("/settings")}}>Settings</h3>
        </div>
    );
}