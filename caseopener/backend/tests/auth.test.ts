// @ts-ignore
import request from 'supertest';
declare module supertest {}
// @ts-ignore
import express from 'express';
import authRoutes from '../src/routes/auth';
import sequelize from '../src/databse';
import User from '../src/models/User';

// Setup express app
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Auth API', () => {
    let token = '';

    it('should register a new user', async () => {
        const res = await request(app).post('/auth/register').send({
            username: 'testuser',
            password: 'secret',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should login and return a token', async () => {
        const res = await request(app).post('/auth/login').send({
            username: 'testuser',
            password: 'secret',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    it('should fetch profile using token', async () => {
        const res = await request(app)
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('testuser');
        expect(res.body.balance).toBeDefined();
    });

    it('should add 100 coins to balance', async () => {
        const profileBefore = await request(app)
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        const balanceBefore = profileBefore.body.balance;

        const res = await request(app)
            .post('/auth/add-balance')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.balance).toBe(balanceBefore + 100);
    });
});
