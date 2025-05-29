import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// Middleware do uwierzytelniania tokenu
export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        if (!decoded.id) return res.sendStatus(403); // brak ID → błąd

        req.user = { id: decoded.id }; // jawnie przypisujemy tylko ID
        next();
    });
};

// Rejestracja
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashed });
        res.json(user);
    } catch {
        res.status(400).json({ error: 'User already exists' });
    }
});

// Logowanie
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET); // <-- dodany username
    res.json({ token });
});

// Dodawanie 100 coinsów do konta
router.post('/add-balance', authenticateToken, async (req: any, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.balance += 100;
    await user.save();

    res.json({ balance: user.balance });
});

// Pobieranie profilu
router.get('/profile', authenticateToken, async (req: any, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            id: user.id,
            username: user.username,
            balance: user.balance,
        });
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
