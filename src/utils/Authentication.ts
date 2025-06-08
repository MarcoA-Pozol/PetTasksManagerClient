import axios from 'axios';

//Declare axios API
const api = axios.create({baseURL: 'http://localhost:5000/auth'});

interface checkUserAuthenticationProps {
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean | null>>;
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
}
export const checkUserAuthentication = async ({setIsAuthenticated, setAuthUser}:checkUserAuthenticationProps) => {
    
    api.get('/check', {withCredentials: true}).then((response:any) => {
        
        setIsAuthenticated(true);
        setAuthUser(response.data.user);
    })
    .catch(() => {
        setIsAuthenticated(false);            
    });
};