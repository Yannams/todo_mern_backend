import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {generateToken} from "../utils/generateToken.js"




export const register = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { nom, prenom, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer l'utilisateur
        const user = new User({
            nom,
            prenom,
            email,
            password: hashedPassword,
            listes:[]
        });

        const newUser = await user.save();
        res.status(201).json({
            id: newUser._id,
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            token: generateToken(newUser._id),
            listes:[],
        });
        
    } catch (error) {
        console.error("Erreur Mongo/Mongoose :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}