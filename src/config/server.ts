import  * as dotenv  from "dotenv";
import  connetDataBase  from "../database/connection";

export default  () => {
    dotenv.config();
    connetDataBase.connetDataBase();

}