import { validationResult } from "express-validator";
import User from "../models/User.js";

export const addList = async (req, res) => {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const titre = req.body.titre
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non connecté" });
        }
        const newList = { titre };
        user.listes.push(newList);
        await user.save();

        // Récupérer la dernière liste ajoutée
        const addedList = user.listes[user.listes.length - 1];

        res.status(201).json({
            message: "Liste ajoutée avec succès",
            list: {
                id: addedList._id,
                titre: addedList.titre,
                taches: addedList.taches || []
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}