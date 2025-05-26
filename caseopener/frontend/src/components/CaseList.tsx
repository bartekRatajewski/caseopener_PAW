import { useAuth } from '../context/AuthContext';
import { openCase } from '../api/api';

const cases = [
    { id: '1', name: 'Starter Case', price: 100 },
    { id: '2', name: 'Pro Case', price: 250 },
];

export default function CaseList() {
    const { token } = useAuth();
    const handleOpen = async (caseId: string) => {
        try {
            const result = await openCase(caseId, token!);
            alert(`You received: ${result.skin.name}`);
            window.location.reload();
        } catch (e) {
            alert('Not enough funds or error opening case');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Available Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cases.map((c) => (
                    <div key={c.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl">{c.name}</h3>
                        <p className="text-gray-600 mb-2">Cost: ${c.price}</p>
                        <button
                            onClick={() => handleOpen(c.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Open
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}