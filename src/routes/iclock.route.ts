import express, { Router } from "express";
import { IclockController } from "../controllers/iclock.controller";
import { reqRaw } from "../middlewares/middleware.req";

export class IclockRouter {
    public router: Router;
    private controller: IclockController = new IclockController();
    constructor() {
        this.router = express.Router()
        this.registerRoutes()
    }

    // remplace my example routes and controller methods for your own 
    protected registerRoutes(): void {
        this.router.get('/cdata', this.controller.cdataGet)
        this.router.get('/getrequest', this.controller.getRequestGet)
        this.router.post('/cdata', this.controller.cdataPost)
        this.router.post('/devicecmd', this.controller.deviceCmdPost)
    }
}