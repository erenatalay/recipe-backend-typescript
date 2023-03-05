const BaseService = require("./BaseService");
import { User } from "../entity/User";

class UserService extends BaseService {
    constructor(){
        super(User)
    }
}

module.exports = new UserService();