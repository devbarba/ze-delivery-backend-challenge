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
        const checkUsersExists = await User.findOne(
            {
                where: { email },
            },
            { $exists: true }
        );

        if (checkUsersExists) {
            throw new AppError('Email Address Already Used.');
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
