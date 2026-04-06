import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Trash2 } from 'lucide-react';
import api from '../services/api';

export default function Records() {
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({ amount: '', type: 'EXPENSE', category: '', date: new Date().toISOString().slice(0, 16), notes: '' });

    const fetchRecords = async () => {
        try {
            const res = await api.get('/records?size=50&sort=date,desc');
            setRecords(res.data.content || []);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchRecords(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/records', formData);
            setFormData({ ...formData, amount: '', category: '', notes: '' });
            fetchRecords();
        } catch (error) { alert("Failed to add record."); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this record?")) {
            await api.delete(`/records/${id}`);
            fetchRecords();
        }
    };

    const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Manage Records</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 h-fit">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Record</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="Amount ($)" type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium text-slate-700">Type</label>
                            <select className="px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                                <option value="EXPENSE">Expense</option>
                                <option value="INCOME">Income</option>
                            </select>
                        </div>
                        <Input label="Category" type="text" placeholder="Groceries, Salary" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
                        <Input label="Date & Time" type="datetime-local" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                        <Input label="Notes (Optional)" type="text" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                        <Button type="submit" className="w-full">Add Record</Button>
                    </form>
                </Card>
                <Card className="col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-sm text-slate-500">
                                    <th className="pb-3 font-medium">Date</th>
                                    <th className="pb-3 font-medium">Category</th>
                                    <th className="pb-3 font-medium">Type</th>
                                    <th className="pb-3 font-medium text-right">Amount</th>
                                    <th className="pb-3 font-medium text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((r) => (
                                    <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-3 text-sm text-slate-700">{new Date(r.date).toLocaleDateString()}</td>
                                        <td className="py-3 text-sm font-medium text-slate-900">{r.category}</td>
                                        <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${r.type === 'INCOME' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.type}</span></td>
                                        <td className="py-3 text-sm text-right font-medium text-slate-900">{formatMoney(r.amount)}</td>
                                        <td className="py-3 text-center">
                                            <button onClick={() => handleDelete(r.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={18} className="mx-auto" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}