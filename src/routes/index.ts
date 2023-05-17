import express from 'express';
import { UserRouter } from './user.route';
import { tokenVerify } from '../middlewares/middleware.auth';
import { IclockRouter } from './iclock.route';
import { reqRaw } from '../middlewares/middleware.req';

// if you want to add another router like news or something else
// you could add one 'server.use(...)' below the 'server.use('/user',...)

const routes = (server: express.Application): void => {


    server.use('/user', new UserRouter().router)
    server.use('/iclock', new IclockRouter().router)

    server.use(tokenVerify)
};

export default routes