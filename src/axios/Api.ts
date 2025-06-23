import axios from 'axios';
import { useEffect } from 'react';

//Declare axios API
const api = axios.create({baseURL: 'http://localhost:5000', withCredentials: true});

export const expiredTokenInterceptor = () => {

    let isRefreshing = false;

    useEffect(() => {

        const expiredTokenInterceptor = api.interceptors.response.use(
            response => response,
            async error => {

                const originalRequest = error.config;
                const responseData = error.response?.data;

                const isTokenExpired = error.response?.status === 401 && 
                                        responseData?.error === 'TOKEN_EXPIRED';

                // Handle token refresh
                if (isTokenExpired) {

                    if (!isRefreshing) {
                        isRefreshing = true;
                        
                        return api.post('/auth/refresh', {})
                        .then(() => {
                            isRefreshing = false;
                            return api(originalRequest); // retry original request
                        })
                    }
                }
                
                isRefreshing = false;
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(expiredTokenInterceptor);
        };
    }, []);
};

export default api;