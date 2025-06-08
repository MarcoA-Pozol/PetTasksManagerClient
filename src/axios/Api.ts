import axios from 'axios';

//Declare axios API
const api = axios.create({baseURL: 'http://localhost:5000'});

//interceptors
api.interceptors.response.use(function(response){
    return response;
}, async error => {

    const prevRequest = error.response.config; //req url that triggered error
    const responseData = error.response.data; //current response data
    
    //if error was in check auth and due to expired access token
    if(error.status === 401 && responseData.error === 'TOKEN_EXPIRED') {
        
        //try refresh!
        return api.post('/auth/refresh', {}, {withCredentials: true}).then(() => {
            
            //and re send prev request (check auth)
            return api(prevRequest);
        })
        .catch(function(err){
            return Promise.reject(err);  //if refresh fails
        });
    }

    //error from different request, just continue 
    return Promise.reject(error);
});

export default api;