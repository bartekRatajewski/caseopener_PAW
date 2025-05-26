"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Case_1 = __importDefault(require("../models/Case"));
const Skin_1 = __importDefault(require("../models/Skin"));
const InventorItem_1 = __importDefault(require("../models/InventorItem"));
const router = express_1.default.Router();
const SECRET = 'SECRET_KEY';
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
router.post('/open/:caseId', auth, async (req, res) => {
    const kase = await Case_1.default.findByPk(req.params.caseId);
    if (!kase)
        return res.status(404).json({ error: 'Case not found' });
    if (!req.user)
        return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.balance < kase.price) {
        return res.status(400).json({ error: 'Insufficient funds' });
    }
    const randomSkinId = kase.skins[Math.floor(Math.random() * kase.skins.length)];
    const skin = await Skin_1.default.findByPk(randomSkinId);
    if (!skin) {
        return res.status(500).json({ error: 'Skin not found in database' });
    }
    await InventorItem_1.default.create({ userId: req.user.id, skinId: skin.id });
    req.user.balance -= kase.price;
    await req.user.save();
    res.json({ won: skin, balance: req.user.balance });
});
exports.default = router;
