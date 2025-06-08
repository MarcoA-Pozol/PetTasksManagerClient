interface checkUserAuthenticationProps {
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean | null>>;
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
    api:Axios.AxiosInstance;
}
export const checkUserAuthentication = async ({api, setIsAuthenticated, setAuthUser}:checkUserAuthenticationProps) => {
    
    await api.get('/auth/check', {withCredentials: true})
    
    .then((response:any) => {
        
        setIsAuthenticated(true);
        setAuthUser(response.data.user);
    })
    .catch(() => {
        setIsAuthenticated(false);            
    });
};