import api from '../axios/Api';

interface checkUserAuthenticationProps {
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean | null>>;
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
}
export const checkUserAuthentication = async ({setIsAuthenticated, setAuthUser}:checkUserAuthenticationProps) => {
    
    await api.get('/auth/check', {withCredentials: true})
    
    .then((response:any) => {
        
        setIsAuthenticated(true);
        setAuthUser(response.data.user);
    })
    .catch(() => {
        setIsAuthenticated(false);            
    });
};