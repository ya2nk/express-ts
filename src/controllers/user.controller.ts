import { Request, Response } from "express"
import UserService from "../services/user.service"

export class UserController {

    public async index(req: Request, res: Response): Promise<void> {
        const users = await UserService.getAll()
        res.status(200).json(users)
    }

    public getAll(req: Request, res: Response) {
        console.log(req.body)
        res.status(200).json({ message: "test" })
    }
}