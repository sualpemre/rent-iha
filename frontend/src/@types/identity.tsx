
export type RegisterType = {
    email: string;
    name: string;
    surname: string;
    password: string;
    re_password: string;
}

export type UserType = {
    id: number;
    email: string;
    is_active: boolean;
    user_id: string;
    surname: string;
    name: string;
    last_login: string | null;
    role: number;
    created_at: string;
    updated_at: string;
}

export interface AuthType {
    access: string;
    refresh: string;
    user_id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
}

export type LoginType = {
    email: string;
    password: string;
}

export enum UserRole {
    Admin = "Admin",
    Default = "Default"
}

