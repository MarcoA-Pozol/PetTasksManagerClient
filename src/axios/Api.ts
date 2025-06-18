import axios from 'axios';
import { useEffect } from 'react';

//Declare axios API
const api = axios.create({baseURL: 'http://localhost:5000', withCredentials: true});

const logout = () => {
    window.location.href = '/auth';
}



export const authInterceptor = () => {

    let isRefreshing = false;
    let failedQueue: any[] = [];

    const processQueue = (error: any) => {
    failedQueue.forEach(prom => {
        if (error) {
        prom.reject(error);
        } else {
        prom.resolve(api(prom.config));
        }
    });
    failedQueue = [];
    };


    useEffect(() => {

        const authInterceptor = api.interceptors.response.use(
            response => response,
            async error => {

                const originalRequest = error.config;
                const responseData = error.response?.data;

                const is401 = error.response?.status === 401;
                const isTokenExpired = responseData?.error === 'TOKEN_EXPIRED';
                const isEmailUnverified = responseData?.error === 'UNVERIFIED_EMAIL';

                // If not token expired nor email unverified, just logout
                if (is401 && !isTokenExpired && !isEmailUnverified) {
                    logout();
                    return Promise.reject(error);
                }

                // Handle token refresh
                if (is401 && isTokenExpired) {
                    if (originalRequest._retry) {
                        // Prevent infinite loop
                        return Promise.reject(error);
                    }

                    if (isRefreshing) {
                        // Queue this request until refresh is done
                        return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalRequest });
                        });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    return api.post('/auth/refresh', {})
                    .then(() => {
                        isRefreshing = false;
                        processQueue(null);
                        return api(originalRequest); // retry original request
                    })
                    .catch((err) => {
                        isRefreshing = false;
                        processQueue(err);
                        logout();
                        return Promise.reject(err);
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(authInterceptor);
        };
    }, []);
};


export const emailInterceptor = () => {

    useEffect(() => {

        //Email not verified response interceptor
        const emailInterceptor = api.interceptors.response.use(
            response => response,
            error => {

                const responseData = error.response?.data;
                const isEmailUnverified = (error.response?.status === 401 && responseData.error === "UNVERIFIED_EMAIL");

                if(isEmailUnverified) {
                    window.location.href = '/email-verify';
                }
            }
        );

        return () => {
            api.interceptors.response.eject(emailInterceptor);
        };
    }, []);
};



export default api;