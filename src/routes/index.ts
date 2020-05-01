import { Router, Response, Request } from 'express';
import partnersRouter from './partners.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Ze Delivery Challenge',
    });
});

routes.use('/partners', partnersRouter);

export default routes;
