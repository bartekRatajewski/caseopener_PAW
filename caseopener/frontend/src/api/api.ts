const API_URL = 'http://localhost:3000';

const headers = (token?: string) => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
});

export async function registerUser(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Register failed');
}

export async function loginUser(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json(); // powinien zwracać { token, user }
}

export const getUserProfile = async (token: string) => {
    const res = await fetch('/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();

    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
};

export const getInventory = async (token: string) => {
    const res = await fetch(`${API_URL}/inventory`, {
        headers: headers(token),
    });
    return res.json();
};

export const sellItem = async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/inventory/sell/${id}`, {
        method: 'POST',
        headers: headers(token),
    });
    return res.json();
};

export const openCase = async (caseId: string, token: string) => {
    const res = await fetch(`${API_URL}/cases/open/${caseId}`, {
        method: 'POST',
        headers: headers(token),
    });
    if (!res.ok) throw new Error('Not enough funds or error opening case');
    return res.json();
};