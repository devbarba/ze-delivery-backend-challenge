import dotenv from 'dotenv';
import path from 'path';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index';
import connect from './database';
import Config from './configs';
import errorMiddleware from './middlewares/errorMiddleware';

const mongoConfig = new Config().mongo;
dotenv.config();

class App {
    public server: Application;

    constructor() {
        this.server = express();
        this.mongo();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    public mongo() {
        const db: string = mongoConfig.url;
        connect(db);
    }

    public middlewares() {
        this.server.use(cors());
        this.server.use(express.static(path.join(__dirname, 'public')));
        this.server.use(bodyParser.json());
        this.server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }

    private errorHandling() {
        this.server.use(errorMiddleware);
        this.server.use(errorHandler());
    }

    private routes() {
        this.server.use(routes);
    }
}

export default new App().server;
