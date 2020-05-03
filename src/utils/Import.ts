import ZePartner from '../models/ZePartner';
import pdvs from '../pdvs.json';
import connect from '../database';
import Config from '../configs';
import UserInterface from '../interfaces/UserInterface';
import User from '../models/User';
import { getObjectId } from 'mongo-seeding';

const mongoConfig = new Config().mongo;

const user: UserInterface[] = [
    {
        _id: getObjectId('ZeDelivery'),
        id: 1,
        name: 'ZeDelivery',
        email: 'ze@delivery.com',
        password:
            '$2a$08$JLP2kQqz6Q/y0utPkpMXL.6.rQN8pH7ubz7c6k/vhgXyCLjVjvXtu',
    },
];

class ImportPdvs {
    constructor() {
        const db: string = mongoConfig.url;
        connect(db);
        this.importPdvs();
        this.importUser();
    }

    public async importPdvs(): Promise<void> {
        try {
            Object.entries(pdvs.pdvs).forEach(async (obj) => {
                const partnerToAdd = await ZePartner.findOne(
                    {
                        id: obj[1].id,
                    },
                    { $exists: true }
                );

                if (!partnerToAdd) {
                    await ZePartner.create(obj[1]);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    public async importUser(): Promise<void> {
        try {
            user.forEach(async (obj) => {
                const userToAdd = await User.findOne(
                    {
                        id: obj.id,
                    },
                    { $exists: true }
                );

                if (!userToAdd) {
                    await User.create(obj);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export default new ImportPdvs();
