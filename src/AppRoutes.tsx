import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppView from "./components/app/AppView.tsx";
import AuthenticationView from "./components/auth/AuthenticationView.tsx";
import PageNotFoundView from "./components/PageNotFoundView.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AnimatePresence } from "framer-motion"; // Motion transition effect between pages change

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><AppView/></ProtectedRoute>}/>
                    <Route path="/auth" element={<AuthenticationView/>}/>
                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;