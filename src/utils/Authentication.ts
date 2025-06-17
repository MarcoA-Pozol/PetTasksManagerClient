import api from '../axios/Api';

interface checkUserAuthenticationProps {
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
}
export const checkUserAuthentication = async ({setAuthUser}:checkUserAuthenticationProps) => {
    
    await api.get('/auth/check')    
    .then((response:any) => {
        setAuthUser(response?.data.user);
    });
};