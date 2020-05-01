import dotenv from 'dotenv';
import path from 'path';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import routes from './routes/index';
import connect from './database';
import Config from './configs';

const mongoConfig = new Config().mongo;
dotenv.config();

class App {
    public server: Application;

    constructor() {
        this.server = express();
        this.mongo();
        this.middlewares();
        this.routes();
    }

    public mongo() {
        const db: string = mongoConfig.url;
        connect(db);
    }

    public middlewares() {
        this.server.use(express.static(path.join(__dirname, 'public')));
        this.server.use(bodyParser.json());
        this.server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        this.server.use(
            (
                err: any,
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                err.status = 404;
                next(err);
            }
        );

        this.server.use(errorHandler());
    }

    private routes() {
        this.server.use(routes);
    }
}

export default new App().server;
