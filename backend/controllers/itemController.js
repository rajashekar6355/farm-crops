import itemModel from "../models/itemsModel.js";
import fs from "fs";

// add fruit or vegetable item

const addItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const item = new itemModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await item.save();
        res.json({ success: true, message: "Item Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Item Unable to Add" });
    }
};


//all items list

const listItems = async (req, res) => {
    try {
        const items = await itemModel.find({});
        res.json({ success: true, data: items });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Items Unable to Lists" });
    }
};


// Remove items

const removeItems = async (req, res) => {
    try {
        const item = await itemModel.findById(req.body.id);
        fs.unlink(`uploads/${item.image}`, () => { });
        await itemModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Item Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Item Unable to Remove" });
    }
};

export { addItem, listItems, removeItems };
