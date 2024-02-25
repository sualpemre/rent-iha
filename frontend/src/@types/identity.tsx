
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

/*
export type WareHouseType = {
    warehouseNumber: string;
    status: boolean;
}


export type FilterType = {
    selectedStation: StationType | undefined;
    selectedProject: ProjectType | undefined;
    selectedTab: number;
    setSelectedStation: (station: StationType | undefined) => void;
    setSelectedProject: (project: ProjectType | undefined) => void;
    setSelectedTab: (tab: number) => void;
}

export interface IFilterType {
    filters: FilterType;
}

*/