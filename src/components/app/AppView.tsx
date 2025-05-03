import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import TaskCard from "./TaskCard";

const AppView = () => {
    // Dark | Light theme
    const [theme, setTheme] = useState("light");
    // Current auth user
    const currentAuthUser = localStorage.getItem('currentAuthUser') || 'anonym';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentAuthUser');
        navigate('/auth');
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Redirect if the user is not authenticated

 

    if (currentAuthUser === 'anonym') {
        return <Navigate to='/auth'/>;
    }
 


    return (
        <>
            <body className={`app-container ${theme}`}>
                <button onClick={toggleTheme} className="theme-toggle-btn">Theme</button>
                <button onClick={handleLogout} style={{backgroundColor:'red', borderRadius:'5px', color:'white'}}>Logout</button>
                
                <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
                <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
                <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
            </body>
        </>
    );
}

export default AppView;