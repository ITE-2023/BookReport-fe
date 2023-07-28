import axios, { AxiosInstance } from 'axios';
// import cookies from 'js-cookie';

const SERVER_ADDRESS = "http://localhost:8080";

export const customAxios: AxiosInstance = axios.create({
    baseURL: `${SERVER_ADDRESS}`,
    headers: {'Content-type': 'application/json'}
    // headers: {
    // access_token: cookies.get('access_token'),
    // },
});

export default customAxios