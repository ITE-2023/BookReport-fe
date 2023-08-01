import axios, { AxiosInstance } from 'axios';

const SERVER_ADDRESS = "http://localhost:8080";

const memberURL = {
    MEMBER_JOIN_URL : "/member/join",
    MEMBER_LOGIN_URL : "/member/login"
}

const api : AxiosInstance = axios.create({
    baseURL: `${SERVER_ADDRESS}`,
    headers: {'Content-type': 'application/json'},
    timeout: 5000
});

// api.interceptors.request.use(
//     (config) => {
//         // 요청 전 수행 로직
//         return config;
//     },
//     (err) => {
//         // 에러 시 수행 로직
//         return Promise.reject(err);
//     }
// );

api.interceptors.response.use(
    (response) => {
        // 응답 수행 로직
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const customAxios = {
    join: async (data) => {
        const response = await api.post(memberURL.MEMBER_JOIN_URL,  data);
        return response;
    },
    login: async (data) => {
        const response = await api.post(memberURL.MEMBER_LOGIN_URL, data);
        return response;
    }
};

export {customAxios, memberURL}