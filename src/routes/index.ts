import { Router, Response, Request } from 'express';
import partnersRouter from './partners.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Welcome my friend to Ze Delivery Challenge',
    });
});

routes.use('/partners', partnersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
