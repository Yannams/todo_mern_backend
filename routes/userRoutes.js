import express from 'express'
import { register } from '../controllers/userController.js'
import { body } from "express-validator";

const router = express.Router()

router.post(
    '/',   
    [
        body("nom").notEmpty().withMessage("Le nom est requis"),
        body("prenom").notEmpty().withMessage("Le prénom est requis"),
        body("email").isEmail().withMessage("Email invalide"),
        body("password")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    ],
    register
)

export default router