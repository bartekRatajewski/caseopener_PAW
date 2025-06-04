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
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Register failed');
    }
    return res.json();
}

export async function loginUser(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
    }
    return res.json();
}

export const getUserProfile = async (token: string) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: headers(token),
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
};

export const getInventory = async (token: string) => {
    const res = await fetch(`${API_URL}/inventory`, {
        headers: headers(token),
    });
    if (!res.ok) throw new Error('Failed to fetch inventory');
    return res.json();
};

export const sellItem = async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/inventory/sell/${id}`, {
        method: 'POST',
        headers: headers(token),
    });
    if (!res.ok) throw new Error('Failed to sell item');
    return res.json();
};

// NEW: Get all cases
export const getAllCases = async () => {
    const res = await fetch(`${API_URL}/cases`, {
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch cases');
    return res.json();
};

export const openCase = async (caseId: string, token: string) => {
    const res = await fetch(`${API_URL}/cases/open/${caseId}`, {
        method: 'POST',
        headers: headers(token),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Not enough funds or error opening case');
    }
    return res.json();
};

export const addBalance = async (token: string) => {
    const res = await fetch(`${API_URL}/auth/add-balance`, {
        method: 'POST',
        headers: headers(token),
    });
    if (!res.ok) throw new Error('Failed to add balance');
    return res.json();
};