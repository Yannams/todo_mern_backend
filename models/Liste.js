import mongoose from "mongoose";
import { tacheSchema } from "./Tache.js";

export const listeSchema=mongoose.Schema({
    titre:{type:String, required:true},
    taches:[tacheSchema]
})

const Liste = mongoose.model('Liste',listeSchema)
export default Liste