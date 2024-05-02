import express from "express";
import { addItem, listItems, removeItems } from "../controllers/itemController.js";
import multer from "multer";

const itemRouter = express.Router();

//Image Storage Engine

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: Storage });


itemRouter.post('/add', upload.single("image"), addItem);
itemRouter.get('/list',listItems)
itemRouter.post('/remove',removeItems)

export default itemRouter;
