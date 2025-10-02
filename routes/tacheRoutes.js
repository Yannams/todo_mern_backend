import express from "express"
import { body } from "express-validator"
import { addTask, deleteTask, statusTask } from "../controllers/tacheController.js"

const router  = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Tache:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         titre:
 *           type: string
 *         statut:
 *           type: string
 *         listeId:
 *           type: string
 *       required:
 *         - titre
 *         - listeId
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Crée une nouvelle tâche dans une liste
 *     tags: [Tache]
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
 *               listeId:
 *                 type: string
 *             required:
 *               - titre
 *               - listeId
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tache:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     titre:
 *                       type: string
 *                     statut:
 *                       type: string
 *                 listeId:
 *                   type: string
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Utilisateur ou liste introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post(
    '/',
    [
        body("titre").notEmpty().withMessage("le titre est requis"),
        body("listeId").notEmpty().withMessage("Aucune liste trouvée")
    ],
    addTask
)

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Met à jour le statut d'une tâche
 *     tags: [Tache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listId:
 *                 type: string
 *                 description: ID de la liste contenant la tâche
 *               statut:
 *                 type: string
 *                 description: Nouveau statut de la tâche ("en cours" ou "terminé")
 *                 example: "terminé"
 *             required:
 *               - listId
 *               - statut
 *     responses:
 *       201:
 *         description: Statut de la tâche mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     titre:
 *                       type: string
 *                     statut:
 *                       type: string
 *       400:
 *         description: Erreur de validation (statut invalide ou champs manquants)
 *       404:
 *         description: Utilisateur, liste ou tâche non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch('/:id',statusTask)

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Supprime une tâche d'une liste
 *     tags: [Tache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche à supprimer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listId:
 *                 type: string
 *                 description: ID de la liste contenant la tâche
 *             required:
 *               - listId
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 taskId:
 *                   type: string
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Utilisateur, liste ou tâche non trouvée
 *       500:
 *         description: Erreur serveur
 */

router.delete('/:id',deleteTask)

export default router