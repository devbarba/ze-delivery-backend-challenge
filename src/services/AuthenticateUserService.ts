import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';
import UserInterface from '../interfaces/UserInterface';
import Config from '../configs';

const jwtconfig = new Config().environment;

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
        const user = await User.findOne({ email }).select(
            '-createdAt -updatedAt -__v'
        );
        if (!user) {
            throw new AppError(422, 'Incorrect E-mail/Password Combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError(422, 'Incorrect E-mail/Password Combination.');
        }

        const token = sign({}, jwtconfig.jwt, {
            subject: user.id,
            expiresIn: jwtconfig.ttl,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
