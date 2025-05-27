import express from 'express';
import cors from 'cors';
import { getCaseNames, getCaseData, openCase } from './cases';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Lista dostępnych skrzynek
app.get('/api/cases', (req, res) => {
    res.json(getCaseNames());
});

// Dane jednej skrzynki
app.get('/api/case/:name', (req, res) => {
    const data = getCaseData(req.params.name);
    if (!data) return res.status(404).json({ error: 'Case not found' });
    res.json(data);
});

// Otwieranie skrzynki
app.post('/api/open/:name', (req, res) => {
    const drop = openCase(req.params.name);
    if (!drop) return res.status(404).json({ error: 'Case not found or empty' });
    res.json(drop);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
