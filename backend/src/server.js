import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./database/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Boring route for testing
app.get("/", (req, res) => {
  res.send("boring roue is runing");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
