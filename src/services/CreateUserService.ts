import { hash } from 'bcryptjs';
import User from '../models/User';
import UserRequestInterface from '../interfaces/UserRequestInterface';
import AppError from '../errors/AppError';

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: UserRequestInterface): Promise<typeof User> {
        const checkUsersExists = await User.findOne(
            {
                where: { email },
            },
            { $exists: true }
        );

        if (checkUsersExists) {
            throw new AppError(409, 'Email Address Already Used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log(user);

        return user;
    }
}

export default CreateUserService;
