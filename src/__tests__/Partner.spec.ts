import request from 'supertest';
import app from '../app';
import ZePartner from '../models/ZePartner';
import partnerMock from './mocks/partnerMock.mock';
import { token } from './mocks/tokenRequest.mock';

describe('`GET /partners/:id`', () => {
    test('should return `200` with a partner', async () => {
        expect.assertions(3);

        const partnerCreateResponse = await request(app)
            .post(`/partners`)
            .send(partnerMock)
            .set('Authorization', `Bearer ${token}`);

        const partnerResponse = await request(app)
            .get(`/partners/${partnerCreateResponse.body.id}`)
            .set('Authorization', `Bearer ${token}`);

        const partner = await ZePartner.findOne({
            id: partnerResponse.body.id,
        });

        if (partner) {
            expect(partner).toBeInstanceOf(ZePartner);
            partner.remove();
        }

        expect(partnerResponse.status).toBe(200);
        expect(partnerResponse.body).toBeDefined();
    });

    test('should return `400` with no partner', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app)
            .get(`/partners/99999999`)
            .set('Authorization', `Bearer ${token}`);

        expect(partnerResponse.status).toBe(400);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            error: 'Partner not found',
        });
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app).get(`/partners/1`);

        expect(partnerResponse.status).toBe(401);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});

describe('`GET /partners/?long={long}&lat={lat}`', () => {
    test('should return `200` with a partner nearby', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app)
            .get(`/partners/?long=-46.57421&lat=-21.785743`)
            .set('Authorization', `Bearer ${token}`);

        const partner = await ZePartner.findOne({
            id: partnerResponse.body.id,
        });

        if (partner) {
            expect(partner).toBeInstanceOf(ZePartner);
        }

        expect(partnerResponse.status).toBe(200);
        expect(partnerResponse.body).toBeDefined();
    });

    test('should return `400` with no partner', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app)
            .get(`/partners/?long=-46.57421&lat=-21.73574`)
            .set('Authorization', `Bearer ${token}`);

        expect(partnerResponse.status).toBe(400);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            error: 'Partner Nearby not found',
        });
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app).get(
            `/partners/?long=-46.57421&lat=-21.73574`
        );

        expect(partnerResponse.status).toBe(401);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});

describe('`POST /partners`', () => {
    test('should return `200` with a created partner', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app)
            .post(`/partners`)
            .send(partnerMock)
            .set('Authorization', `Bearer ${token}`);

        const partner = await ZePartner.findOne({
            id: partnerResponse.body.id,
        });

        if (partner) {
            expect(partner).toBeInstanceOf(ZePartner);
            partner.remove();
        }

        expect(partnerResponse.status).toBe(200);
        expect(partnerResponse.body).toBeDefined();
    });

    test('should return `400` with no partner', async () => {
        expect.assertions(3);

        partnerMock.document = '02.453.716/000170';

        const partnerResponse = await request(app)
            .post(`/partners`)
            .send(partnerMock)
            .set('Authorization', `Bearer ${token}`);

        expect(partnerResponse.status).toBe(400);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            error: 'CNPJ Already Used.',
        });
    });

    test('should return `401` no auth', async () => {
        expect.assertions(3);

        const partnerResponse = await request(app).post(`/partners`);

        expect(partnerResponse.status).toBe(401);
        expect(partnerResponse.body).toBeDefined();

        expect(partnerResponse.body).toMatchObject({
            status: 401,
            message: 'JWT Token is Missing.',
        });
    });
});
