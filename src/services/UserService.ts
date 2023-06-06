import BaseService  from "./BaseService";
import { User } from "../entity/User";

 export class UserService extends BaseService {
    constructor(){
        super(User)
    }
}

export default new UserService();