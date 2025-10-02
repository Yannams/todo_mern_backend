import express from 'express'
import { register } from '../controllers/userController.js'
import { body } from "express-validator";

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID généré automatiquement
 *         nom:
 *           type: string
 *         prenom:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur (non renvoyé dans la réponse)
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */

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