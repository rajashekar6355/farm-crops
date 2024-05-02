import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    cartData:{type:Object,default:{}},


},{minimize:false})
const userModel = mongoose.model.user || mongoose.model("user",userSchema);  // The user is the name where a folder is created in db by this name "user"

export default userModel;