import { resolve } from 'path';
import dotenv from 'dotenv';
import MongoInterface from '../interfaces/MongoInterface';
import EnvironmentInterface from '../interfaces/EnvironmentInterface';
import ExpressInterface from '../interfaces/ExpressInterface';

dotenv.config();

export default class Config {
    public express: ExpressInterface;

    public environment: EnvironmentInterface;

    public mongo: MongoInterface;

    constructor() {
        this.express = {
            port: process.env.PORT || 3000,
            ip: process.env.IP || '127.0.0.1',
        };

        this.environment = {
            env: process.env.NODE_ENV || 'development',
            jwt: process.env.JWT_SECRET,
        };

        this.mongo = {
            url: process.env.MONGO_URL,
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            port: process.env.MONGO_PORT,
        };
    }
}
