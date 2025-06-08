import axios from 'axios';

//Declare axios API
const api = axios.create({baseURL: 'http://localhost:5000'});

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

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        const responseData = error.response?.data;

        const isTokenExpired = error.response?.status === 401 && responseData?.error === 'TOKEN_EXPIRED';

        if (isTokenExpired && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return api.post('/auth/refresh', {}, { withCredentials: true })
                .then(() => {
                    isRefreshing = false;
                    processQueue(null);
                    return api(originalRequest);
                })
                .catch(err => {
                    isRefreshing = false;
                    processQueue(err);
                    return Promise.reject(err);
                });
        }

        return Promise.reject(error);
    }
);


export default api;