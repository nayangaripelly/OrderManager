import mongoose from "mongoose";
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const userSchema = new schema({
    username : {type:String, require:true},
    email: {type: String, require:true, unique:true},
    password: {type: String, require: true}
});

const catagoryTypes = ["electronic", "cosmetic","clothing","other"];

const orderSchema = new schema({
    name:{type:String, require:true},
    description: {type: String},
    company: {type: String},
    quantity:{type:Number, require:true, default:1},
    catagory: {type:String, enum:catagoryTypes, require:true},
    date: {type:String, require: true},
    userId: {type: objectId, ref:"users" ,require:true},
    cost: {type: Number, require:true},
    discount: {type:Number, default: 0}
});

export const userModel = mongoose.model("users",userSchema);
export const orderModel = mongoose.model("orders",orderSchema);