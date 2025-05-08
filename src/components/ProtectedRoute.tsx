import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [authStatus, setAuthStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await fetch("http://localhost:5000/auth/verify", {
                method: "GET",
                credentials: "include" // Ensures cookies are sent with the request
            });

            setAuthStatus(response.ok);
        };

        checkAuth();
    }, []);

    return authStatus === null ? <Navigate to="/auth" /> : authStatus ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
