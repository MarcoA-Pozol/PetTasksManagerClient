import { useNavigate } from "react-router-dom";
// Icons
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import CreateIcon from '@mui/icons-material/Create';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface LeftMenuProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
}

const LeftMenu = ({theme, setTheme, setIsAuthenticated, setDisplayedPage}: LeftMenuProps) => {
    const navigate = useNavigate();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogout = async () => {
        await fetch("http://localhost:5000/auth/logout", { method: "POST", credentials: "include" });
        setIsAuthenticated(false);
        navigate("/auth");
    };

    // Pages display
    const displayHome = () => {
        setDisplayedPage("home");
    };

    const displayCreate = () => {
        setDisplayedPage("create");
    };

    return (
        <div className="left-content rounded-border">
            <p onClick={displayHome}><HomeIcon/></p>
            <p onClick={displayCreate}><CreateIcon/></p>
            <p><AnalyticsIcon/></p>
            <button className="toggle-theme-button" onClick={toggleTheme}><LightModeIcon/></button>
            <button className="logout-button" onClick={handleLogout}><LogoutIcon/></button>
        </div>
    );
}

export default LeftMenu