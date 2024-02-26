import React, { useState, ReactNode, useContext } from 'react';
import Header from '../../../components/Header/index';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserRole } from '../../../@types/identity';
import { useNavigate } from 'react-router-dom';


const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const authcontext = useContext(AuthContext)
    if (authcontext.user?.role !== UserRole.Admin) {
        return navigate('/signin')
    }
    
    return (
        authcontext.user?.role == UserRole.Admin ? 
        <div className="dark:bg-boxdark-2 dark:text-bodydark w-full">
            <div className="flex h-screen overflow-hidden">
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div> : <></>
    );
};

export default AdminLayout;
