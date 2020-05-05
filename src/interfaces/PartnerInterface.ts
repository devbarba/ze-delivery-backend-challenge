import CoverageAreaInterface from './CoverageAreaInterface';
import AddressInterface from './AddressInterface';

export default interface ZePartnerInterface {
    id?: number;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: CoverageAreaInterface;
    address: AddressInterface;
}
