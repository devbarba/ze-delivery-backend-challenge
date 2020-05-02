import UserInterface from '../../interfaces/UserInterface';
import { getObjectId } from 'mongo-seeding';

let users: UserInterface[] = [
    {
        name: 'ZeDelivery',
        email: 'ze@delivery.com',
        password: '123456',
    },
    {
        name: 'Harbs',
        email: 'jp@harbs.com',
        password: '123456',
    },
];

module.exports = users.map((element: UserInterface) => ({
    id: getObjectId(element.name),
    name: element.name,
    email: element.email,
    password: element.password,
}));
