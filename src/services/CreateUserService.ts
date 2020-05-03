import { hash } from 'bcryptjs';
import User from '../models/User';
import UserRequestInterface from '../interfaces/UserRequestInterface';
import AppError from '../errors/AppError';
import UserInterface from '../interfaces/UserInterface';

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: UserRequestInterface): Promise<UserInterface> {
        const checkUsersExists = await User.findOne({
            email,
        });

        if (checkUsersExists) {
            throw new AppError(409, 'Email Address Already Used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
