import MenuItem from "../models/MenuItems.model.js";

// ================geting=================

export const getItemsByCategoryId = async (req, res) => {
  const { id: CategoryId } = req.params;
  if (!CategoryId) {
    return res.status(404).json({ message: "Not found CategoryId" });
  }
  try {
    const items = await MenuItem.find({ category: CategoryId }).populate(
      "category",
      "name"
    );

    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this category" });
    }

    res.status(200).json({ items });
  } catch (error) {
    console.error("Getitems Error:", error.message);
    res.status(501).json({ message: "error in getItems route", error });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await MenuItem.find().populate("category", "name");

    if (items.length === 0) {
      return res.status(404).json({ message: "items not found" });
    }

    res.status(200).json({ items });
  } catch (error) {
    console.error("Getitems Error:", error.message);
    res.status(501).json({ message: "error in getItems route", error });
  }
};

// ================creation===============

export const createItem = async (req, res) => {
  const { image, name, description, price } = req.body;
  const { id: categoryId } = req.params;
  if (!name || !description || !categoryId || !price) {
    return res.status(400).json({
      message: "Name, description, price and categoryId are required",
    });
  }

  try {
    // Check if an item with the same name already exists
    const existingItem = await MenuItem.findOne({ name, category: categoryId });
    if (existingItem) {
      return res
        .status(400)
        .json({
          message: "Item with this name already exists in the category",
        });
    }

    const item = new MenuItem({
      image,
      name,
      description,
      price,
      category: categoryId,
    });
    await item.save();
    const populatedItem = await MenuItem.findById(item._id).populate(
      "category"
    );

    res
      .status(201)
      .json({ message: "Item created successfully", MenuItem: populatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error in creating item", error });
  }
};

// =============deletion=================

export const delteeItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const deleteditem = await MenuItem.findByIdAndDelete(itemId);
    if (!deleteditem) {
      return res.status(404).json({ message: "itemId not found" });
    }
    res.status(200).json({ message: "item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting item", error });
  }
};
