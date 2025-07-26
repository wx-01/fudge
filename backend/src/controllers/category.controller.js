import MenuCategory from "../models/MenuCategory.model.js";

// ==============geting=================

export const getCategory = async (req, res) => {
  try {
    const allCategory = await MenuCategory.find();
    res.status(201).json({ allCategory });
  } catch (error) {
    res.status(501).json({ message: "error in getCategory route", error });
  }
};

// ============creation=================

export const createCategory = async (req, res) => {
  const { name } = req.body;

  console.log("Received data:", req.body); // Log the received data

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check if a category with the same name already exists
    const existingCategory = await MenuCategory.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }

    const category = new MenuCategory({
      name,
    });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error in creating category", error });
  }
};

// ==============deletion==============

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await MenuCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting category", error });
  }
};
