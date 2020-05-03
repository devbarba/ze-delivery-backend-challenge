import { Request, Response } from 'express';
import ReadPartnerService from '../services/ReadPartnerService';
import CreatePartnerService from '../services/CreatePartnerService';

export default class PartnerController {
    public async readPartner(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const readPartner = new ReadPartnerService();

            const partner = await readPartner.execute({
                id,
            });

            delete partner._doc._id;

            return response.status(200).json(partner);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }

    public async createPartner(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const {
                tradingName,
                ownerName,
                document,
                coverageArea,
                address,
            } = request.body;

            const createPartner = new CreatePartnerService();

            const partner = await createPartner.execute({
                tradingName,
                ownerName,
                document,
                coverageArea,
                address,
            });

            return response.status(200).json(partner);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
