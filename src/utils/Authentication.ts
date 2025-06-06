interface checkUserAuthenticationProps {
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean | null>>;
    setAuthUser:React.Dispatch<React.SetStateAction<boolean | null>>;
    api:Axios.AxiosInstance;
}
export const checkUserAuthentication = async ({api, setIsAuthenticated, setAuthUser}:checkUserAuthenticationProps) => {
    api.get('/check', {withCredentials: true}).then(function(response:any){
        setIsAuthenticated(true);
        setAuthUser(response.data.user);
        
    }).catch(function(){
        setIsAuthenticated(false);            
    });
};