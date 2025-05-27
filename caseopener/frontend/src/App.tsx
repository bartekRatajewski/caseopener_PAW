import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CaseList from './components/CaseList';
import Inventory from './components/Inventory';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    return auth?.token ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <main className="p-6">
                    <Routes>
                        <Route path="/" element={<CaseList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />



                        <Route path="/inventory" element={
                            <PrivateRoute>
                                <Inventory />
                            </PrivateRoute>
                        } />
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
}
