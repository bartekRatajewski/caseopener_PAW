import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './auth'; // Import the auth middleware from your auth file
import User from '../models/User';
import Case from '../models/Case';
import Skin from '../models/Skin';
import InventoryItem from '../models/InventorItem';

const router = express.Router();

interface AuthenticatedRequest extends Request {
    user?: User;
}

// Get all cases (public endpoint - no auth required)
router.get('/', async (req: Request, res: Response) => {
    try {
        const cases = await Case.findAll({
            order: [['price', 'ASC']] // Order by price ascending
        });
        res.json(cases);
    } catch (error) {
        console.error('Error fetching cases:', error);
        res.status(500).json({ error: 'Failed to fetch cases' });
    }
});

router.post('/open/:caseId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const kase = await Case.findByPk(req.params.caseId);
    if (!kase) return res.status(404).json({ error: 'Case not found' });

    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.user.balance < kase.price) {
        return res.status(400).json({ error: 'Insufficient funds' });
    }

    const randomSkinId = kase.skins[Math.floor(Math.random() * kase.skins.length)];
    const skin = await Skin.findByPk(randomSkinId);

    if (!skin) {
        return res.status(500).json({ error: 'Skin not found in database' });
    }

    await InventoryItem.create({ userId: req.user.id, skinId: skin.id });
    req.user.balance -= kase.price;
    await req.user.save();

    res.json({ won: skin, balance: req.user.balance });
});

export default router;