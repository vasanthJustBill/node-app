import express from "express";
import cors from "cors";
import router from "./routes/routes";
import sequelize from "./models/sequelize";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

/* This code is authenticating the connection to the database using Sequelize ORM and then
synchronizing the models with the database. If the authentication and synchronization are
successful, it logs a message saying "Database connection has been established successfully." If
there is an error, it logs a message saying "Unable to connect to the database:" followed by the
error message. */
sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log("Database connection has been established successfully.");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
