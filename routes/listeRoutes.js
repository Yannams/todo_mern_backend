import express from "express"
import { body } from "express-validator"
import { addList } from "../controllers/listeController.js"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Tache:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la tâche
 *         titre:
 *           type: string
 *         statut:
 *           type: string
 *     Liste:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID généré automatiquement par MongoDB
 *         titre:
 *           type: string
 *         taches:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tache'
 *           description: Liste des tâches, vide à la création
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /list:
 *   post:
 *     summary: Crée une nouvelle liste pour l'utilisateur connecté
 *     tags: [Liste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *             required:
 *               - titre
 *     responses:
 *       201:
 *         description: Liste créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 list:
 *                   $ref: '#/components/schemas/Liste'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */


router.post(
  "/",
  [body("titre").notEmpty().withMessage("le titre est requis")],
  addList
)   

export default router
