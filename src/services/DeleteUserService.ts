import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: Request): Promise<void> {
        const user = await User.findOne(id);

        if (!user) {
            throw new AppError('User not found');
        }

        await User.delete(id);
    }
}

export default DeleteUserService;
