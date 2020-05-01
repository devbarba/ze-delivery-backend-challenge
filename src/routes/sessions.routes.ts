import { Router, Request, Response } from 'express';
import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post('/', (request: Request, response: Response) =>
    sessionController.createSession(request, response)
);

export default sessionsRouter;
