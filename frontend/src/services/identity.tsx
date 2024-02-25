import axios, { AxiosError, AxiosResponse } from "axios";
import { RegisterType, UserType } from "../@types/identity";
import { toast } from 'react-toastify';


const API_URL = import.meta.env.PROD ? window.origin + '/api' : 'http://localhost:8000/api';


export const RegisterService = async (formData: RegisterType): Promise<AxiosResponse | null | any> => {
    try {
        const apiUrl = `${API_URL}/identity/register/?format=json`;
        return await axios.post(apiUrl, formData);
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response;
    }
}


export const LoginService = async (formData: RegisterType): Promise<UserType | null> => {
    try {

        const apiUrl = `${API_URL}/identity/login/?format=json`;
        const response: AxiosResponse<UserType> = await axios.post<UserType>(apiUrl, formData);

        if (response.status === 201) {
            toast.success("Kullanıcı Kaydı Başarılı");
        }
        else if (response.status === 400) {
            toast.error("Kullanıcı Kaydı Oluşturulamadı");
        }
        return response
    } catch (error) {
        toast.error("Sunucu Kaynaklı Bir Hata Medana Geldi");
        return null;
    }
}


export const getProject = async (projectNumber: string): Promise<ProjectType[]> => {
    try {
        if (projectNumber.length > 4) {
            const response: AxiosResponse<ProjectType[]> = await axios.get<ProjectType[]>(
                `${API_URL}/ProjectSearch.php?search=${projectNumber}`
            );
            const projects: ProjectType[] = response.data;
            return projects;
        }
        return []
    } catch (error) {
        throw new Error('Failed to fetch project');
    }
}