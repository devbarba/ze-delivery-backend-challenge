import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import PartnerInterface from '../interfaces/PartnerInterface';
import ZePartner from '../models/ZePartner';

class CreateUserService {
    public async execute({
        tradingName,
        ownerName,
        document,
        coverageArea,
        address,
    }: PartnerInterface): Promise<PartnerInterface> {
        const checkPartnerExists = await ZePartner.findOne({
            document,
        });

        if (checkPartnerExists) {
            throw new AppError(409, 'CNPJ Already Used.');
        }

        const countPartners = await ZePartner.count({});

        const partner = await ZePartner.create({
            id: countPartners + 1,
            tradingName,
            ownerName,
            document,
            coverageArea,
            address,
        });

        return partner;
    }
}

export default CreateUserService;
