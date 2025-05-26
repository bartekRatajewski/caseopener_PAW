"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const SECRET = 'SECRET_KEY';
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    try {
        const user = await User_1.default.create({ username, password: hashed });
        res.json(user);
    }
    catch {
        res.status(400).json({ error: 'User already exists' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User_1.default.findOne({ where: { username } });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET);
    res.json({ token });
});
exports.default = router;
