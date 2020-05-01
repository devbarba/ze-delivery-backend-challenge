import { Document, model, Schema } from 'mongoose';
import CoverageAreaInterface from '../../src/interfaces/CoverageAreaInterface';
import AddressInterface from '../../src/interfaces/AddressInterface';

interface ZePartnerInterface extends Document {
    id: number;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: CoverageAreaInterface;
    address: AddressInterface;
}

const ZePartner = Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        tradingName: {
            type: String,
            required: true,
        },
        ownerName: {
            type: String,
            required: true,
        },
        document: {
            type: String,
            unique: true,
            required: true,
        },
        coverageArea: {
            type: Object,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
    },
    { collection: 'zePartners' }
);

export default model<ZePartnerInterface>('ZePartner', ZePartner);
