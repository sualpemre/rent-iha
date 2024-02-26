
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { LoginService, RefreshService } from "../services/identity";
import { AuthType, LoginType } from "../@types/identity";
import { AxiosResponse } from "axios";


interface AuthContextData {
    signed: boolean;
    user: AuthType | null;
    loading: boolean;
    signIn(formData: LoginType): Promise<AxiosResponse | null>;
    signOut(): Promise<AxiosResponse | null>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthType | null>(null);
    const [loading, setLoading] = useState(true);

    const loadStoragedData = async () => {
        const storagedUser = localStorage.getItem("@RJSAuth:user");
        if (storagedUser && storagedUser != undefined && storagedUser !== "undefined") {
            let newStoragedUser = JSON.parse(storagedUser);
            const formData = { access: newStoragedUser.access, refresh: newStoragedUser.refresh };
            const response = await RefreshService(formData);
            if (response.status === 200) {
                newStoragedUser.access = response.data.access;
                setUser(newStoragedUser);
                localStorage.setItem("@RJSAuth:user", JSON.stringify(newStoragedUser));
            }
            setLoading(false);
        } else {
            setUser(null);
        }
    }

    useEffect(() => {
        loadStoragedData();
    }, []);

    const signIn = async (formData: LoginType): Promise<AxiosResponse | null> => {
        setLoading(true);
        const response = await LoginService(formData);
        if (response.status === 200) {
            setUser(response.data);
            localStorage.setItem("@RJSAuth:user", JSON.stringify(response.data));
            return response;
        }
        setLoading(false);
        return null;
    }

    const signOut = async (): Promise<AxiosResponse | null> => {
        localStorage.clear();
        setUser(null);
        return null;
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, loading, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider }