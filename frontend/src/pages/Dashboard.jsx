import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

export default function Dashboard() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        api.get('/dashboard/summary')
            .then(res => {
                let data = res.data;
                
                // --- FIX: Convert Java Map to JavaScript Array for Recharts ---
                if (data.categoryBreakdown && !Array.isArray(data.categoryBreakdown)) {
                    data.categoryBreakdown = Object.entries(data.categoryBreakdown).map(
                        ([key, value]) => ({ category: key, total: value })
                    );
                } else if (!data.categoryBreakdown) {
                    data.categoryBreakdown = [];
                }
                
                setSummary(data);
            })
            .catch(console.error);
    }, []);

    if (!summary) return <div className="text-slate-500">Loading FinSight overview...</div>;
    const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full"><ArrowUpCircle size={28} /></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Income</p>
                        <p className="text-2xl font-bold text-slate-900">{formatMoney(summary.totalIncome)}</p>
                    </div>
                </Card>
                <Card className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-full"><ArrowDownCircle size={28} /></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Expenses</p>
                        <p className="text-2xl font-bold text-slate-900">{formatMoney(summary.totalExpenses)}</p>
                    </div>
                </Card>
                <Card className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><DollarSign size={28} /></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Net Balance</p>
                        <p className={`text-2xl font-bold ${summary.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatMoney(summary.netBalance)}
                        </p>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Expense Breakdown</h2>
                    {summary.categoryBreakdown.length > 0 ? (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={summary.categoryBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="total" nameKey="category">
                                        {summary.categoryBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatMoney(value)} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : <div className="h-72 flex items-center justify-center text-slate-400">No expense data available.</div>}
                </Card>
            </div>
        </div>
    );
}