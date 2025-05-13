import { useState, useEffect } from "react";
import "../../styles/app/appView.css";
import LeftMenu from "./LeftMenu";
import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";
import { Navigate, useLocation } from "react-router-dom";

const AppView = () => {
    const [theme, setTheme] = useState("light");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
    const [authUser, setAuthUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                    const data = await response.json()
                    setAuthUser(data.user)
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Error de autenticación:", err);
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    // Don't render anything until auth status is known
    if (isAuthenticated === null) return null;

    // Redirect if user is not authenticated and trying to access app view
    if (!isAuthenticated && location.pathname !== "/auth") {
        return <Navigate to="/auth" />;
    }


    return (
        <>
            <body className={`app-container ${theme}`}>
                <div className="content-container">
                    <LeftMenu theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} authUser={authUser}/>
                    <TasksContainer theme={theme}/>
                    <PetContainer/>
                </div>
            </body>
        </>
    );
}

export default AppView;