import { Server } from './server';
import { AppRoutes } from './routes';
import { envs } from './config/envs';
import { MongoDataBase } from './data';


(async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MOGNOURL,
        dbName: '',
    });

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });

    server.start();
}
