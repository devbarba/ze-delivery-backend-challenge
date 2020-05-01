import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';
import UserInterface from '../interfaces/UserInterface';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: UserInterface;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const user = await User.findOne(
            { where: { email } },
            { $exists: true }
        );

        if (!user) {
            throw new AppError('Incorrect E-mail/Password Combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect E-mail/Password Combination.');
        }

        const token = sign({}, 'acf7ef943fdeb3cbfed8dd0d8f584731', {
            subject: user.id,
            expiresIn: '1d',
        });
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
