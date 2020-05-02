import path from 'path';
import { Seeder } from 'mongo-seeding';
import Config from '../configs';

const dbConfig = new Config().mongo;
const config = {
    database: dbConfig.url,
    dropDatabase: false,
};
const seeder = new Seeder(config);

const collectionReadingOptions = {
    extensions: ['ts', 'js', 'cjs', 'json'],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
};

const collections = seeder.readCollectionsFromPath(
    path.resolve('./src/utils'),
    collectionReadingOptions
);

seeder
    .import(collections)
    .then(() => {
        console.log('Success');
    })
    .catch((err) => {
        console.log('Error', err);
    });
