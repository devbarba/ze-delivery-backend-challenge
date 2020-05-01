import { Document, model, Schema } from 'mongoose';
import UserInterface from '../interfaces/UserInterface';

const User = Schema({
    _id: {
        type: Schema.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

type UserType = UserInterface & Document;

export default model<UserType>('User', User);
