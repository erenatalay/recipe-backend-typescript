import "reflect-metadata";
import { createConnection} from "typeorm";

class Database {
  async connetDataBase() {
    try {
      await createConnection();
      console.log("Successfully connection database.");
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Database();
