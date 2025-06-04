import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// Enhanced middleware to authenticate token and load full user object
export const authenticateToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded: any = jwt.verify(token, SECRET);
        if (!decoded.id) return res.sendStatus(403);

        // Load the full user object from database
        const user = await User.findByPk(decoded.id);
        if (!user) return res.sendStatus(403);

        req.user = user; // Assign the full user object
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};

// Registration - no changes needed
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

// Login - no changes needed
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
    res.json({ token });
});

// Updated to use the full user object
router.post('/add-balance', authenticateToken, async (req: any, res) => {
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    req.user.balance += 100;
    await req.user.save();

    res.json({ balance: req.user.balance });
});

// Simplified profile route since we already have the full user object
router.get('/profile', authenticateToken, async (req: any, res) => {
    try {
        if (!req.user) return res.status(404).json({ message: 'User not found' });

        res.json({
            id: req.user.id,
            username: req.user.username,
            balance: req.user.balance,
        });
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;