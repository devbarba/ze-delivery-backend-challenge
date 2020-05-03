import AppError from '../errors/AppError';
import ZePartner from '../models/ZePartner';
import PartnerNearbyInterface from '../interfaces/PartnerNearbyInterface';

interface Request {
    long: number;
    lat: number;
}

class ReadNerbyPartnerService {
    public async execute({
        long,
        lat,
    }: Request): Promise<PartnerNearbyInterface> {
        const coordinates = [long, lat];

        const partnerNearby = await ZePartner.findByCoordinates({
            long,
            lat,
        });

        if (!partnerNearby) {
            throw new AppError(404, 'Partner Nearby not found');
        }

        return partnerNearby;
    }
}

export default ReadNerbyPartnerService;
