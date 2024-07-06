import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  migrations: ['src/database/migrations/*.ts'],
  entities: [
    User
  ],
});

let dataSource: DataSource;

AppDataSource.initialize()
  .then((ds) => {
    dataSource = ds;
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Datasource initialization error:", error));

process.on("exit", () => {
  dataSource.destroy();
});
