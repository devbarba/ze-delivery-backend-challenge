import request from 'supertest';
import app from '../app';
import { token } from './mocks/tokenRequest.mock';
import userMock from './mocks/userMock.mock';
import User from '../models/User';

describe('`GET /users`', () => {
    test('should return `200` with all users', async () => {
        expect.assertions(3);

        const userResponse = await request(app)
            .get(`/users`)
            .set('Authorization', `Bearer ${token}`);

        const userSearch = await User.findById(userResponse.body[0]._id);

        if (userSearch) {
            expect(userSearch).toBeInstanceOf(User);
        }
        expect(userResponse.status).toBe(200);
        expect(userResponse.body).toBeDefined();
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app).get(`/users`);

        expect(partnerResponse.status).toBe(401);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});

describe('`POST /users`', () => {
    test('should return `200` with a created user', async () => {
        expect.assertions(3);

        const userResponse = await request(app)
            .post(`/users`)
            .send(userMock)
            .set('Authorization', `Bearer ${token}`);

        const user = await User.findById(userResponse.body._id);

        if (user) {
            expect(user).toBeInstanceOf(User);
        }

        expect(userResponse.status).toBe(201);
        expect(userResponse.body).toBeDefined();
    });

    test('should return `400` with partner already exists and remove', async () => {
        expect.assertions(3);

        const userResponse = await request(app)
            .post(`/users`)
            .send(userMock)
            .set('Authorization', `Bearer ${token}`);

        const userSearch = await User.deleteOne({
            email: userMock.email,
        });

        expect(userResponse.status).toBe(400);
        expect(userResponse.body).toBeDefined();

        expect(userResponse.body).toMatchObject({
            error: {
                status: 409,
                message: 'Email Address Already Used.',
            },
        });
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const userResponse = await request(app).post(`/users`);

        expect(userResponse.status).toBe(401);
        expect(userResponse.body).toBeDefined();

        expect(userResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});

describe('`DELETE /users`', () => {
    test('should return `204` with no body and remove user', async () => {
        expect.assertions(2);

        const userCreateResponse = await request(app)
            .post(`/users`)
            .send(userMock)
            .set('Authorization', `Bearer ${token}`);

        const userResponse = await request(app)
            .delete(`/users/${userCreateResponse.body._id}`)
            .set('Authorization', `Bearer ${token}`);

        const userSearch = await User.findById(userResponse.body._id);

        if (userSearch) {
            userSearch.remove();
        }
        expect(userResponse.status).toBe(204);
        expect(userResponse.body).toBeDefined();
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const userResponse = await request(app).delete(`/users`);

        expect(userResponse.status).toBe(401);
        expect(userResponse.body).toBeDefined();

        expect(userResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});
