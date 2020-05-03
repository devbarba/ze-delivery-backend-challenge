import AppError from '../errors/AppError';
import PartnerInterface from '../interfaces/PartnerInterface';
import ZePartner from '../models/ZePartner';

interface Request {
    id: string;
}

class ReadPartnerService {
    public async execute({ id }: Request): Promise<PartnerInterface> {
        const partner = await ZePartner.findOne({ id });

        if (!partner) {
            throw new AppError(404, 'Partner not found');
        }

        return partner;
    }
}

export default ReadPartnerService;
