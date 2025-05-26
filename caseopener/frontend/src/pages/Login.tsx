import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🔐 Submitting login form:', { username, password });

        try {
            const res = await loginUser(username, password);
            console.log('✅ Login response:', res); // token + user

            login(res.token, res.user);
            console.log('📥 Token and user stored');

            navigate('/'); // powinno przenieść do głównej strony
            console.log('🚀 Navigated to home');
        } catch (err) {
            console.error('❌ Login error:', err);
            alert('Login failed');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
