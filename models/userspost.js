import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    fristName:String,
    lastName:String,
    email:String,
    password:String
   
   });
   
   const users = mongoose.model('users', usersSchema);
   
   export default  users;
   