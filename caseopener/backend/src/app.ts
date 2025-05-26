import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './databse';
import authRoutes from './routes/auth';
import inventoryRoutes from './routes/inventory';
import caseRoutes from './routes/case';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/cases', caseRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
