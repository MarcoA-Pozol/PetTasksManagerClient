import { useNavigate } from "react-router-dom";
// Icons
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import CreateIcon from '@mui/icons-material/Create';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LanguageIcon from '@mui/icons-material/Language';
// Language
import "../../../i18n";
import { useTranslation } from "react-i18next";

interface LeftMenuProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
}

const LeftMenu = ({theme, setTheme, setIsAuthenticated, setDisplayedPage}: LeftMenuProps) => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogout = async () => {
        await fetch("http://localhost:5000/auth/logout", { method: "POST", credentials: "include" });
        setIsAuthenticated(false);
        navigate("/auth");
    };

    // Switch language
    const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
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
            <label className="switch-language">
                <LanguageIcon/>
                <select id="language-options" name="language-options" onChange={changeLanguage} defaultValue={i18n.language}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                    <option value="fr">fr</option>
                    <option value="pt">pt</option>
                </select>
            </label>
        </div>
    );
}

export default LeftMenu