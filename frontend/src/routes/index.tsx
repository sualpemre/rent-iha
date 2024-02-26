import React, { useContext } from "react";
import { Navigate, Route, Routes} from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ListIha from "../pages/Admin/components/ListIha";
import Admin from "../pages/Admin";


const MainRoutes: React.FC = () => {
    const authcontext = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/list-iha" element={<ListIha />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default MainRoutes;