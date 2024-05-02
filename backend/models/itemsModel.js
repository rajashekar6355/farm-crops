import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true},
    category:{type:String,require:true}
})

const itemModel = mongoose.model.item || mongoose.model("item",itemSchema)   // The item is the name where a folder is created in db by this name "item"

export default itemModel;