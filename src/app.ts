import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes";
import sequelize from "./models/sequelize";

config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", router);

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
