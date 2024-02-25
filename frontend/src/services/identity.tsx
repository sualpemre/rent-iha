import axios, { AxiosResponse } from "axios";
import { RegisterType } from "../@types/identity";

const API_URL = import.meta.env.PROD ? window.origin + '/materialpicking/backend/' : 'http://localhost:8000/api';


export const Register = async (formData: RegisterType): Promise<RegisterType | null> => {
    try {
        const response: AxiosResponse<ProjectType[]> = await axios.get<ProjectType[]>(
            `${API_URL}/ProjectSearch.php?search=${projectNumber}`
        );
        return null
    } catch (error) {
        throw new Error('Failed to fetch project');
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