// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/" className="hover:underline">Cases</Link>
                <Link to="/inventory" className="hover:underline">Inventory</Link>
            </div>

            {user && (
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Wallet className="w-5 h-5" />
                        <span>${user.balance.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
