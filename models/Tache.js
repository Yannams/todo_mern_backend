import mongoose from "mongoose";

export const tacheSchema = mongoose.Schema({
    titre:{type:String,required:true},
    statut:{type:String, required:true}
})

const Tache = mongoose.model('Tache',tacheSchema)
export default Tache