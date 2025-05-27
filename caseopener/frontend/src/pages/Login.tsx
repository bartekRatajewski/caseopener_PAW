import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.registeredUsername) {
            setUsername(location.state.registeredUsername);
        }
        if (location.state?.message) {
            alert(location.state.message);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('Username and password are required');
            return;
        }

        try {
            const res = await loginUser(username, password);
            console.log('✅ Login response:', res);

            // Zakładając, że endpoint /auth/login zwraca { token, user }
            login(res.token, res.user); // Teraz przekazujemy 2 argumenty

            navigate('/');
        } catch (err) {
            console.error('❌ Login error:', err);
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Login</h2>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">Register here</a>
            </p>
        </div>
    );
}