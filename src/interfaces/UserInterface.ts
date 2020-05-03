import { ObjectID } from 'mongodb';

export default interface UserInterface {
    _id?: ObjectID;
    id?: number;
    name: string;
    email: string;
    password: string;
}
