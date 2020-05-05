import request from 'supertest';
import app from '../app';

describe('Ze Delivery Backend Challenge App', () => {
    test('This should load with no errors', async () => {
        expect.assertions(2);
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Welcome my friend to Ze Delivery Challenge',
        });
    });

    test('This should allow cors', async () => {
        expect.assertions(1);
        const response = await request(app).options('/');
        expect(response.header['access-control-allow-origin']).toBe('*');
    });
});
