import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { authRoutes } from "./routes/auth.route.js";
import { itemRoutes } from "./routes/item.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
