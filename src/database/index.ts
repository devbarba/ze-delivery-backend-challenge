import mongoose from 'mongoose';

export default (db: string) => {
    const connect = () => {
        mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                // return console.log(`Successfully connected to ${db}`);
            })
            .catch((error: Error) => {
                // console.log('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
