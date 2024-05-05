import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRouters from "./routes";
// import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_USER);
const app: Express = express();
const port: string | number = process.env.port || 4000;

app.use(cors());
app.use(express.json());
app.use(todoRouters);

const url: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@test.1pwfe3v.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`;
// const url: string = `mongodb+srv://1842974355:mnP6vJLSch5cvJNO@test.1pwfe3v.mongodb.net/?retryWrites=true&w=majority&appName=Test`;
console.log(url);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port 127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
// console.log("111");
