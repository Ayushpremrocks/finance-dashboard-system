import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, LogOut, Wallet } from 'lucide-react';

export function DashboardLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Admin';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-200">
                    <Wallet className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-xl font-bold text-slate-900">FinSight</span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/dashboard" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/dashboard') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <LayoutDashboard className="h-5 w-5 mr-3" /> Overview
                    </Link>
                    <Link to="/records" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/records') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <Receipt className="h-5 w-5 mr-3" /> Records
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-200">
                    <div className="px-4 py-2 mb-2 text-sm text-slate-500">Logged in as <span className="font-medium text-slate-900">{username}</span></div>
                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="h-5 w-5 mr-3" /> Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8">{children}</div>
            </main>
        </div>
    );
}