import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
 tittle:String,
 desc:String,
 postId:Number

});

const Item = mongoose.model('Item', itemSchema);

export default  Item;
