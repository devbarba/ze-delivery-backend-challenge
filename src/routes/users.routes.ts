import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userController = new UserController();

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', (request: Request, response: Response) => {
    userController.readUsers(request, response);
});

usersRouter.post(
    '/',
    [
        check('name').isString(),
        check('email').isEmail(),
        check('password').isAlphanumeric(),
    ],
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        userController.createUser(request, response);
    }
);

usersRouter.delete('/:id', async (request, response) => {
    userController.deleteUser(request, response);
});

export default usersRouter;
