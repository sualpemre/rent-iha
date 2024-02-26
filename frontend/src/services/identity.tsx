import { RegisterType, LoginType, UserType, AuthType } from "../@types/identity";
import { RequestEnum } from "../@types/http.client.types";
import { AxiosResponse } from "axios";
import { sendRequest } from "./http.client";
import {AuthContext} from "../contexts/AuthContext";
import { useContext } from "react";

const API_URL = import.meta.env.PROD ? window.origin + '/api' : 'http://localhost:8000/api';


export const RegisterService = async (formData: RegisterType): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/identity/register/?format=json`, RequestEnum.POST, '', formData);
}


export const LoginService = async (formData: LoginType): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/identity/login/?format=json`, RequestEnum.POST, '', formData);
}

export const LogoutService = async () => {
    const authcontext = useContext(AuthContext)
    return await sendRequest(`${API_URL}/identity/logout?format=json`, RequestEnum.GET, authcontext.user?.token ?? '')
}

export const IsRole = async (user: AuthType) => {
    return await sendRequest(`${API_URL}/identity/user-role?format=json`, RequestEnum.GET, user?.token ?? '')
}

export const RefreshService = async (userInfo: any) => {
    return await sendRequest(`${API_URL}/identity/login/refresh/?format=json`, RequestEnum.POST, userInfo?.token ?? '', userInfo)
}