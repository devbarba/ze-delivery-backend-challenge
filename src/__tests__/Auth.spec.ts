import request from 'supertest';
import app from '../app';
import { token } from './mocks/tokenRequest.mock';

describe('`POST /sessions`', () => {
    test('should return `200` with token data', async () => {
        expect.assertions(3);

        const sessionResponse = await request(app).post(`/sessions`).send({
            email: 'ze@delivery.com',
            password: '123456',
        });

        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body).toBeDefined();

        expect(sessionResponse.body).toMatchObject({
            user: {
                _id: expect.any(String),
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
            },
            token: expect.any(String),
        });
    });

    test('should return `400` with error', async () => {
        expect.assertions(3);

        const sessionResponse = await request(app).post(`/sessions`).send({
            email: 'ze@delivery.com',
            password: '1234567',
        });

        expect(sessionResponse.status).toBe(400);
        expect(sessionResponse.body).toBeDefined();

        expect(sessionResponse.body).toMatchObject({
            error: 'Incorrect E-mail/Password Combination.',
        });
    });
});
