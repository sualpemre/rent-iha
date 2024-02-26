import { RegisterType, LoginType, UserType, AuthType } from "../@types/identity";
import { RequestEnum } from "../@types/http.client.types";
import { AxiosResponse } from "axios";
import { sendRequest } from "./http.client";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
const API_URL = import.meta.env.PROD ? window.origin + '/api' : 'http://localhost:8000/api';



export const IhaService = async (): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/aircraft/?format=json`, RequestEnum.GET, '');
}


export const DeleteIha = async (aircraft_id: number): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/aircraft/${aircraft_id}/?format=json`, RequestEnum.DELETE, '');
}


export const SetAircraft = async (aircraft: any): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/aircraft/${aircraft.id}/?format=json`, RequestEnum.PUT, '', aircraft);
}

export const CreateIha = async (formData: any): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/aircraft/?format=json`, RequestEnum.POST, '', formData);
}


export const FilterAircraft = async (value: any): Promise<AxiosResponse | null | any> => {
    return await sendRequest(`${API_URL}/aircraft/?format=json&value=${value}`, RequestEnum.GET, '');
}

