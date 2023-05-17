import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { tokenVerify } from '../middlewares/middleware.auth';

export class UserRouter {
    public router: Router;

    // remplace my controller for your controller
    private controller: UserController = new UserController();

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    // remplace my example routes and controller methods for your own 
    protected registerRoutes(): void {
        //this.router.use(tokenVerify)
        this.router.get('/', this.controller.index)
        this.router.post('/', this.controller.getAll)
    }

}