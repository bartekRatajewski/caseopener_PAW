import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth() ?? {};

    console.log('🧠 Navbar user:', user);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Link to="/" className="font-bold text-xl">Case Opener</Link>
                <Link to="/cases" className="hover:underline">Cases</Link>
                <Link to="/inventory" className="hover:underline">Inventory</Link>
            </div>
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span>💰 {user.balance} coins</span>
                        <span>👤 {user.username}</span>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
