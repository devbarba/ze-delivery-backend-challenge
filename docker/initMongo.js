db.createUser({
    user: 'zeDelivery',
    pwd: 'zeTest',
    roles: [
        {
            role: 'readWrite',
            db: 'zedelivery',
        },
    ],
});

db.createCollection('zePartners');
db.createCollection('users');
