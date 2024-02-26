import axios, { AxiosError, AxiosResponse } from "axios";
import { RequestEnum } from "../@types/http.client.types";

export const sendRequest = async (url: string, type: RequestEnum, token: string, params: any = null): Promise<AxiosResponse | null | any> => {
    try {
        const headers = { Authorization: `Token ${token}` }

        switch (type) {
            case RequestEnum.POST:
                return await axios.post(url, params, (token != '' && token) ? { headers }: {});
            case RequestEnum.GET:
                return await axios.get(url, (token != '' && token) ? { headers }: {});
            case RequestEnum.PUT:
                return await axios.put(url, params, (token != '' && token) ? { headers }: {});
            case RequestEnum.DELETE:
                return await axios.delete(url, (token != '' && token) ? { headers }: {});
            default:
                break;
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response;
    }
} 
