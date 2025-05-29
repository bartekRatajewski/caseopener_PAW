import { useEffect, useState } from 'react';
import { getInventory, sellItem } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Inventory() {
    const { token } = useAuth();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        if (!token) return; // zabezpieczenie
        try {
            const result = await getInventory(token);
            setItems(result);
        } catch (err) {
            console.error('Failed to fetch inventory:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [token]); // ⬅ czekamy na token

    const handleSell = async (id: string) => {
        if (!token) return;
        await sellItem(id, token);
        await fetchItems();
    };

    if (loading) return <p className="text-center mt-4">Loading inventory...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Your Inventory</h2>
            {items.length === 0 && <p>No items.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="border p-4 rounded shadow">
                        <h3 className="text-lg">{item.Skin.name}</h3>
                        <p className="text-sm text-gray-500">Price: ${item.Skin.price}</p>
                        <button
                            onClick={() => handleSell(item.id)}
                            className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Sell
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
