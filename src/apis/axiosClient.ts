import { appInfo } from "@/constants/appInfors";
import axios from "axios";
import queryString from "query-string";

// const baseURL = `http://192.168.102.88:3001`;

const axiosClient = axios.create({
    baseURL : appInfo.baseUrl,
    paramsSerializer : (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config : any) => {

    const accesstoken = ''

    config.headers = {
        Authorization: `jiadji ${accesstoken}`,
        Accept : 'application/json',
        ...config.headers,
    }
    return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data;
        }else{
            return Promise.reject(res.data);
        }
    }, 
    (error) => {
        const {response} = error;
        return Promise.reject(response.data);
    }
);

export default axiosClient