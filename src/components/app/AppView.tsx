import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "../../styles/app/appView.css";
import TaskCard from "./TaskCard";
import licenciadoGallardo from "../../assets/licenciado_gallardo.jpg";
// Icons
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import CreateIcon from '@mui/icons-material/Create';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const AppView = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    localStorage.setItem("authStatus", "authorized");
                    setIsAuthenticated(true);
                } else {
                    localStorage.setItem("authStatus", "unauthorized");
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error de autenticación:", err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        await fetch("http://localhost:5000/auth/logout", { method: "POST", credentials: "include" });
        localStorage.setItem("authStatus", "unauthorized");
        setIsAuthenticated(false);
        navigate("/auth");
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (isAuthenticated === false) {
        return <Navigate to="/auth" />;
    }

    const completedTasks = 12;
    const toDoTasks = 4;
    const inProgressTasks = 7;
    const totalTasks = completedTasks + toDoTasks + inProgressTasks;

    return (
        <>
            <body className={`app-container ${theme}`}>
                <div className="content-container">
                    <div className="left-content rounded-border">
                        <p><HomeIcon/></p>
                        <p><CreateIcon/></p>
                        <p><AnalyticsIcon/></p>
                        <button className="toggle-theme-button" onClick={toggleTheme}><LightModeIcon/></button>
                        <button className="logout-button" onClick={handleLogout}><LogoutIcon/></button>
                    </div>

                    <div className="middle-content rounded-border">
                        <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
                        <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
                        <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
                    </div>

                    <div className="right-content rounded-border">
                        <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>OVERALL STATS</h3>
                        <img src={licenciadoGallardo} alt="licenciado gallardo image"></img>
                        <div className="tasks-stats rounded-border spaced-around">
                            <span id="completedTasks">Completed: {completedTasks}</span>
                            <span id="toDoTasks">To do: {toDoTasks}</span>
                            <span id="inProgressTasks">In progress: {inProgressTasks}</span>
                        </div>
                        <div className="pet-stats rounded-border spaced-around">
                            <span id="completed-tasks-percentage">{Math.floor((completedTasks / totalTasks) * 100)}% / 100% ({totalTasks}) </span>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default AppView;