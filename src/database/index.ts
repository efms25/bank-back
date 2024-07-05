import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/database/entities/*.ts'],
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
