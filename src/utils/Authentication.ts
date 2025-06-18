import api from '../axios/Api';

interface checkUserAuthenticationProps {
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
export const checkUserAuthentication = async ({setAuthUser, setIsAuthenticated}: checkUserAuthenticationProps) => {
    
    await api.get('/auth/check')    
    .then((response:any) => {
        setAuthUser(response?.data.user);
        setIsAuthenticated(true);
    })
    .catch(() => {
        setAuthUser(null);
        setIsAuthenticated(false);
    })
};