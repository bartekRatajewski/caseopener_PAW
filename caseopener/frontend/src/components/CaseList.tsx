import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { openCase } from '../api/api';

const cases = [
    { id: '1', name: 'Starter Case', price: 100 },
    { id: '2', name: 'Pro Case', price: 250 },
];

export default function CaseList() {
    const { token, user, updateBalance } = useAuth() || {};
    const [isOpening, setIsOpening] = useState(false);
    const [error, setError] = useState('');

    const handleOpen = async (caseId: string) => {
        if (!token) {
            setError('You need to log in first');
            return;
        }

        const caseItem = cases.find(c => c.id === caseId);
        if (!caseItem) {
            setError('Case not found');
            return;
        }

        setIsOpening(true);
        setError('');

        try {
            const result = await openCase(caseId, token);
            alert(`You received: ${result.skin.name} (Value: $${result.skin.price})`);

            // Używamy nowego balansu zwróconego z backendu
            if (updateBalance && typeof result.newBalance === 'number') {
                updateBalance(result.newBalance);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to open case');
        } finally {
            setIsOpening(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Available Cases</h2>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cases.map((c) => (
                    <div key={c.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl">{c.name}</h3>
                        <p className="text-gray-600 mb-2">Cost: ${c.price}</p>
                        <button
                            onClick={() => handleOpen(c.id)}
                            disabled={isOpening || !token || (user?.balance || 0) < c.price}
                            className={`px-4 py-2 rounded text-white ${
                                isOpening
                                    ? 'bg-gray-500'
                                    : (!token || (user?.balance || 0) < c.price)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isOpening ? 'Opening...' : 'Open Case'}
                        </button>
                        {user && (user.balance || 0) < c.price && (
                            <p className="text-red-500 text-sm mt-1">Not enough funds</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}