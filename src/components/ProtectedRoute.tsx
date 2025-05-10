import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const authStatus = localStorage.getItem("authStatus");

    if (authStatus === "authorized") {
        return <>{children}</>;
    } else if (authStatus === "unauthorized") {
        return <Navigate to="/auth" />;
    } else {
        return <Navigate to="/" />;
    }    
};

export default ProtectedRoute;
