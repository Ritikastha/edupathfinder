// src/components/Layout/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';

const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="container mt-3">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
