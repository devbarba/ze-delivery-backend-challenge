import User from '../models/User';
import AppError from '../errors/AppError';
import UserInterface from '../interfaces/UserInterface';

class ReadUserService {
    public async execute(): Promise<UserInterface[]> {
        const users = await User.find({}).select('-password');

        if (!users) {
            throw new AppError(404, 'Users not found');
        }

        return users;
    }
}

export default ReadUserService;
