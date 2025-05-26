import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import InventoryItem from '../models/InventorItem';
import Skin from '../models/Skin';
import User from '../models/User';

const router = express.Router();
const SECRET = 'SECRET_KEY';

// Rozszerzamy Request, by zawierało usera
interface AuthenticatedRequest extends Request {
    user?: User;
}

// Middleware do uwierzytelniania
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

// Pobieranie ekwipunku użytkownika
router.get('/', auth, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const items = await InventoryItem.findAll({
        where: { userId: req.user.id },
        include: [Skin],
    });

    res.json(items);
});

// Sprzedaż itemu
router.post('/sell/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const item = await InventoryItem.findByPk(req.params.id, { include: [Skin] });

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    // Sprawdzenie czy przedmiot należy do użytkownika
    if (item.getDataValue('userId') !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const skin = item.getDataValue('Skin');
    if (!skin) {
        return res.status(500).json({ error: 'Skin not loaded' });
    }

    const price = skin.getDataValue('price');
    await item.destroy();

    req.user.balance += price;
    await req.user.save();

    res.json({ balance: req.user.balance });
});

export default router;
