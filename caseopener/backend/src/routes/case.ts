import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Case from '../models/Case';
import Skin from '../models/Skin';
import InventoryItem from '../models/InventorItem';

const router = express.Router();
const SECRET = 'SECRET_KEY';

interface AuthenticatedRequest extends Request {
    user?: User;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        const payload = jwt.verify(token || '', SECRET) as { id: number };
        const user = await User.findByPk(payload.id);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });
        req.user = user;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

router.post('/open/:caseId', auth, async (req: AuthenticatedRequest, res: Response) => {
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