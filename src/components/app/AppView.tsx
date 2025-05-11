import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "../../styles/app/appView.css";
import TaskCard from "./TaskCard";
import licenciadoGallardo from "../../assets/licenciado_gallardo.jpg";

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

    return (
        <>
            <body className={`app-container ${theme}`}>
                <button onClick={toggleTheme} className="theme-toggle-btn">Theme</button>
                <button onClick={handleLogout} style={{backgroundColor:'red', borderRadius:'5px', color:'white'}}>Logout</button>
                
                <div className="content-container">
                    <div className="left-content">
                        <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
                        <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
                        <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
                    </div>

                    <div className="right-content">
                        <h2>Licenciado gallardo</h2>
                        <img src={licenciadoGallardo} alt="licenciado gallardo image"></img>
                    </div>
                </div>
            </body>
        </>
    );
}

export default AppView;