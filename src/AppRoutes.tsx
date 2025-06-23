import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppView from "./components/app/AppView.tsx";
import AuthenticationView from "./components/auth/AuthenticationView.tsx";
import PageNotFoundView from "./components/PageNotFoundView.tsx";
import { AnimatePresence } from "framer-motion"; // Motion transition effect between pages change
import EmailVerificationForm from "./components/auth/EmailVerificationForm.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    {/* Protected routes */}
                    <Route path="/" element={
                        <AuthProvider>
                            <ProtectedRoute><AppView/></ProtectedRoute>
                        </AuthProvider>}/>

                    <Route path="/email-verify" element={
                        <AuthProvider>
                            <ProtectedRoute><EmailVerificationForm/></ProtectedRoute>
                        </AuthProvider>}/>

                    {/* Public routes */}
                    <Route path="/auth" element={
                        <AuthProvider>
                            <AuthenticationView/>
                        </AuthProvider>}/>

                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;