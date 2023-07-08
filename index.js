import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";
import sequelize from "./db.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Обробка помилок, останній Midleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
