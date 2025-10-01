import mongoose from "mongoose";
import { listeSchema } from "./Liste.js";

const userShema= new mongoose.Schema({
    nom:{type:String, required:true },
    prenom:{type:String, required:true },
    email:{type:String, required:true, unique:true},
    password : {type:String, required:true},
    listes:[listeSchema]
})

const User = mongoose.model('User', userShema)
export default User