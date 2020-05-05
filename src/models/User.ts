import { Document, Model, model, Schema } from 'mongoose';
import { ObjectID } from 'mongodb';

interface UserInterface extends Document {
    _id: ObjectID;
    name: string;
    email: string;
    password: string;
}

const User = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel: Model<UserInterface> = model<
    UserInterface,
    Model<UserInterface>
>('User', User);

export default UserModel;
