import { useState, useEffect } from "react";
import "../../styles/app/appView.css";
import { Navigate, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import CreateTaskPage from "./CreateTaskPage";
import LeftMenu from "./LeftMenu";

interface Task {
    name: string;
    status: "pending" | "in-progress" | "done";
}

const AppView = () => {
    const [theme, setTheme] = useState("light");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
    const [authUser, setAuthUser] = useState<any>(null);
    const [displayedPage, setDisplayedPage] = useState("home");

    const handleDataFromChild = (data: any) => {
        const createdTask: Task = data;
        console.log("Data received from child component on app view parent one -> created task: ", createdTask);
    }

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
                setIsAuthenticated(false);
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
            <div className={`app-container ${theme}`}>
                <LeftMenu theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage}/>
                <div className="content-container">
                    {displayedPage === "home" && <HomePage theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} authUser={authUser} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage}/>}
                    {displayedPage === "create" && <CreateTaskPage onData={handleDataFromChild} userId={authUser?._id}/>}
                </div>
            </div>
        </>
    );
}

export default AppView;