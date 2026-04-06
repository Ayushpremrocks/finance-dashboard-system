import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Wallet } from 'lucide-react';
import api from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const token = btoa(`${username}:${password}`);
        try {
            const response = await api.get('/dashboard/summary', { headers: { Authorization: `Basic ${token}` } });
            if (response.status === 200) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('username', username);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4"><Wallet size={32} /></div>
                    <h1 className="text-2xl font-bold text-slate-900">FinSight</h1>
                    <p className="text-slate-500 mt-2">Sign in to manage your finances</p>
                </div>
                <Card>
                    <form onSubmit={handleLogin}>
                        <Input label="Username" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <Input label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">{error}</div>}
                        <Button type="submit" className="w-full mt-2">Sign In</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}