import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addBalance } from '../api/api';

const Navbar: React.FC = () => {
    const auth = useAuth();

    if (!auth) {
        return null;
    }

    const { user, logout, token, updateBalance } = auth;

    const handleAddBalance = async () => {
        if (!token) return;
        try {
            const result = await addBalance(token);
            updateBalance(result.balance);
        } catch (err) {
            console.error('Failed to add balance:', err);
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Link to="/" className="font-bold text-xl">Case Opener</Link>
                <Link to="/inventory" className="hover:underline">Inventory</Link>
            </div>
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="bg-gray-700 px-3 py-1 rounded">
                            💰 {user.balance?.toFixed(2) || '0.00'} coins
                        </span>
                        <span className="bg-gray-700 px-3 py-1 rounded">
                            👤 {user.username}
                        </span>
                        <button
                            onClick={handleAddBalance}
                            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                        >
                            +100 coins
                        </button>
                        <button
                            onClick={logout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
