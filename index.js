import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";
import sequelize from "./db.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

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
