import app from './app';
import Config from './configs';

const expressConfig = new Config().express;

app.listen(expressConfig.port, expressConfig.ip, (error: Error) => {
    if (error) {
        console.log('Could not list connections', error);
        process.exit(10);
    }
    console.log(
        `Server running at http://${expressConfig.ip}:${expressConfig.port}`
    );
});
