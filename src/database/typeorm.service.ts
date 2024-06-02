import { DataSource } from "typeorm";
import { User } from "../domains/users/entity/users.entity";

class TypeOrmService {
  dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: "sqlite-db",
      synchronize: true,
      entities: [User],
    });
  }
  async connect() {
    try {
      await this.dataSource.initialize();
      console.log("Database connection established");
    } catch (error) {
      console.error("Error connecting to database: ", error);
    }
  }
}

export default new TypeOrmService();
