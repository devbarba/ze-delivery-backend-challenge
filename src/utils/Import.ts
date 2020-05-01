import ZePartner from '../models/ZePartner';
import pdvs from '../pdvs.json';
import connect from '../database';
import Config from '../configs';

const mongoConfig = new Config().mongo;

class ImportPdvs {
    constructor() {
        const db: string = mongoConfig.url;
        connect(db);
        this.execute();
    }

    public async execute(): Promise<void> {
        try {
            Object.entries(pdvs.pdvs).forEach(async (obj) => {
                const partnerToAdd = await ZePartner.find(
                    {
                        where: {
                            id: obj[0],
                        },
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
}

export default new ImportPdvs();
