"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const InventorItem_1 = __importDefault(require("../models/InventorItem"));
const Skin_1 = __importDefault(require("../models/Skin"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const SECRET = 'SECRET_KEY';
// Middleware do uwierzytelniania
const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const payload = jsonwebtoken_1.default.verify(token || '', SECRET);
        const user = await User_1.default.findByPk(payload.id);
        if (!user)
            return res.status(401).json({ error: 'Unauthorized' });
        req.user = user;
        next();
    }
    catch {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
// Pobieranie ekwipunku użytkownika
router.get('/', auth, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ error: 'Unauthorized' });
    const items = await InventorItem_1.default.findAll({
        where: { userId: req.user.id },
        include: [Skin_1.default],
    });
    res.json(items);
});
// Sprzedaż itemu
router.post('/sell/:id', auth, async (req, res) => {
    if (!req.user)
        return res.status(401).json({ error: 'Unauthorized' });
    const item = await InventorItem_1.default.findByPk(req.params.id, { include: [Skin_1.default] });
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
exports.default = router;
