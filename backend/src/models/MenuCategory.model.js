import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model("MenuCategory", menuCategorySchema);
