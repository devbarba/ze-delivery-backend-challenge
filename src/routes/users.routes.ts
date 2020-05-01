import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userController = new UserController();

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', (request: Request, response: Response) =>
    userController.createUser(request, response)
);

usersRouter.delete('/:uuid', async (request, response) => {
    userController.deleteUser(request, response);
});

export default usersRouter;
