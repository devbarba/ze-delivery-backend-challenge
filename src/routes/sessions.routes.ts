import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    [check('email').isEmail(), check('password').isAlphanumeric()],
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        sessionController.createSession(request, response);
    }
);

export default sessionsRouter;
