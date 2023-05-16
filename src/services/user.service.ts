import { User } from "../models/user.model"
class UserService {
    public async getAll() {
        return await User.find()
    }
}

export default new UserService()