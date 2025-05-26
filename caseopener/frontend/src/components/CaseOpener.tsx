import React, { useEffect, useState } from "react";

type Item = {
    name: string;
    rarity: string;
};

export default function CaseOpener() {
    const [cases, setCases] = useState<string[]>([]);
    const [selectedCase, setSelectedCase] = useState<string>("");
    const [drop, setDrop] = useState<Item | null>(null);

    useEffect(() => {
        fetch("http://localhost:3001/cases")
            .then(res => res.json())
            .then(data => setCases(data));
    }, []);

    const handleOpen = async () => {
        const res = await fetch(`http://localhost:3001/cases/${selectedCase}/open`, {
            method: "POST"
        });
        const data = await res.json();
        setDrop(data);
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">CS2 Case Opener</h1>

            <select
                className="w-full p-2 mb-4 text-black"
                onChange={e => setSelectedCase(e.target.value)}
                value={selectedCase}
            >
                <option value="">Wybierz skrzynkę</option>
                {cases.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <button
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded w-full"
                onClick={handleOpen}
                disabled={!selectedCase}
            >
                Otwórz skrzynkę
            </button>

            {drop && (
                <div className="mt-4 text-center">
                    <p className="text-lg">🎉 Trafiono: <strong>{drop.name}</strong></p>
                    <p className="text-sm text-gray-300">Rzadkość: {drop.rarity}</p>
                </div>
            )}
        </div>
    );
}
