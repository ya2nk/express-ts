import express from 'express'
import 'reflect-metadata'
import cors from 'cors'
import routes from './routes';
import { errorResponder, invalidPathHandler, errorLogger } from './middlewares/middleware.logger';
import AppDataSource from './config/config.database';
import { reqRaw } from './middlewares/middleware.req';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.logger()
    }

    public config(): void {
        this.app.set('port', 3000);
        process.env.TZ = "Asia/Jakarta";
        this.app.use(express.text({ type: "*/*" }));
        this.app.use(reqRaw)
        //this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())

        routes(this.app)
    }

    public start(): void {
        AppDataSource()
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening in port 3000');
        });
    }

    private logger(): void {
        this.app.use(errorLogger)
        this.app.use(errorResponder)
        this.app.use(invalidPathHandler)
    }
}

const server = new Server();
server.start();