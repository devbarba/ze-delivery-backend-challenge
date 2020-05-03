import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userController = new UserController();

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', (request: Request, response: Response) => {
    userController.readUsers(request, response);
});

usersRouter.post('/', (request: Request, response: Response) => {
    userController.createUser(request, response);
});

usersRouter.delete('/:id', async (request, response) => {
    userController.deleteUser(request, response);
});

export default usersRouter;
