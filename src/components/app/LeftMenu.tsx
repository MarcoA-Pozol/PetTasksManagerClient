import { useNavigate } from "react-router-dom";
import { LeftMenuProps } from "../../schemas/LeftMenu";
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
import { useAuthContext } from "../../context/authContext";

const LeftMenu = ({theme, setTheme, setDisplayedPage}: LeftMenuProps) => {
    const { i18n } = useTranslation();

    // Load auth context
    const {logout} = useAuthContext()!;


    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    };

    const handleLogout = async () => {
        logout();
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
        <div className={`left-content rounded-border ${theme}`}>
            <p onClick={displayHome}><HomeIcon/></p>
            <p onClick={displayCreate}><CreateIcon/></p>
            <p><AnalyticsIcon/></p>
            <button className={`toggle-theme-button ${theme}`} onClick={toggleTheme}><LightModeIcon/></button>
            <label className="switch-language">
                <LanguageIcon/>
                <select className={`${theme}`} id="language-options" name="language-options" onChange={changeLanguage} defaultValue={i18n.language}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                    <option value="fr">fr</option>
                    <option value="pt">pt</option>
                    <option value="cn">cn</option>
                    <option value="jp">jp</option>
                    <option value="de">de</option>
                    <option value="ru">ru</option>
                    <option value="ko">ko</option>
                    <option value="it">it</option>
                    <option value="hi">hi</option>

                </select>
            </label>
            <button className={`logout-button ${theme}`} onClick={handleLogout}><LogoutIcon/></button>
        </div>
    );
}

export default LeftMenu;