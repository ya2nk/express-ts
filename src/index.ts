import express from 'express'
import 'reflect-metadata'
import cors from 'cors'
import routes from './routes';
import bodyParser from 'body-parser'
import { errorResponder, invalidPathHandler, errorLogger } from './middlewares/middleware.logger';
import { reqRaw } from './middlewares/middleware.req';
import AppDataSource from './config/config.database';

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

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors())
        this.app.use(reqRaw)
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