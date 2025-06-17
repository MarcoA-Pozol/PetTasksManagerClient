import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppView from "./components/app/AppView.tsx";
import AuthenticationView from "./components/auth/AuthenticationView.tsx";
import PageNotFoundView from "./components/PageNotFoundView.tsx";
import { AnimatePresence } from "framer-motion"; // Motion transition effect between pages change
import EmailVerificationForm from "./components/auth/EmailVerificationForm.tsx";

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    
                    <Route path="/" element={<AppView/>}/>
                    <Route path="/email-verify" element={<EmailVerificationForm/>}/>
                    <Route path="/auth" element={<AuthenticationView/>}/>
                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;