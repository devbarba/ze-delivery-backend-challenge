import { Document, model, Schema, Model } from 'mongoose';
import CoverageAreaInterface from '../../src/interfaces/CoverageAreaInterface';
import AddressInterface from '../../src/interfaces/AddressInterface';
import PartnerNearbyInterface from '../interfaces/PartnerNearbyInterface';
import { ObjectID } from 'mongodb';

interface ZePartnerInterface extends Document {
    _doc?: ObjectID;
    id: number;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: CoverageAreaInterface;
    address: AddressInterface;
}

interface ZePartnerModel extends Model<ZePartnerInterface> {
    findByCoordinates: (
        coordinates: PartnerNearbyInterface
    ) => Promise<PartnerNearbyInterface | null>;
}

const ZePartner = new Schema(
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: 'zePartners' }
);

ZePartner.statics.findByCoordinates = async function findByCoordinates(
    this: ZePartnerModel,
    coordinates: PartnerNearbyInterface
): Promise<ZePartnerInterface | null> {
    const [partnerNearby] = await this.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [coordinates.long, coordinates.lat],
                },
                spherical: true,
                distanceField: 'distanceInMeters',
                query: {
                    coverageArea: {
                        $geoIntersects: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [
                                    coordinates.long,
                                    coordinates.lat,
                                ],
                            },
                        },
                    },
                },
            },
        },
        {
            $limit: 1,
        },
    ]);

    return partnerNearby || null;
};

ZePartner.index({ address: '2dsphere' });

const Partner: ZePartnerModel = model<ZePartnerInterface, ZePartnerModel>(
    'ZePartner',
    ZePartner
);

export default Partner;
