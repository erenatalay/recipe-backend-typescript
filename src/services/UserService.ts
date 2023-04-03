import BaseService  from "./BaseService";
import { User } from "../entity/User";

class UserService extends BaseService {
    constructor(){
        super(User)
    }
}

export default new UserService();