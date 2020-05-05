import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ReadUserService from '../services/ReadUserService';

export default class UserController {
    public async readUsers(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const readUsers = new ReadUserService();

            const users = await readUsers.execute();

            return response.status(200).json(users);
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    public async createUser(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const createUser = new CreateUserService();

            const user = await createUser.execute({
                name,
                email,
                password,
            });

            return response.status(201).json(user);
        } catch (err) {
            return response.status(400).json({ error: err });
        }
    }

    public async deleteUser(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteUser = new DeleteUserService();

            await deleteUser.execute({ id });

            return response.status(204).send();
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
