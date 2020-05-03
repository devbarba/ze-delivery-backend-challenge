import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import _ from 'lodash';

export default class SessionController {
    public async createSession(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { email, password } = request.body;

            const authenticateUser = new AuthenticateUserService();

            const { user, token } = await authenticateUser.execute({
                email,
                password,
            });

            _.omit(user, ['_id']);
            _.omit(user, ['password']);

            return response.status(200).json({ user, token });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
