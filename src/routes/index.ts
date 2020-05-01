import { Router, Response, Request } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Ze Delivery Challenge',
    });
});

export default routes;
