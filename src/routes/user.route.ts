import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller'

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
        this.router.get('/', this.controller.index);
    }

}