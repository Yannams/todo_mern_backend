import express from "express"
import { body } from "express-validator"
import { addList } from "../controllers/listeController.js"

const router  = express.Router()

/**
 * @swagger
 * components:
 * schemas:
 * Liste:
 * type: object
 * properties:
 *  id:
 *   type: string
 *  titre:
 *  type: string
 * taches:
 * type: array
 * items:
 * $ref: '#/components/schemas/Tache'
 */

/**
 * @swagger
 * /todo/list:
 * post:
 * summary: Crée une nouvelle liste
 * tags: [Liste]
 * requestBody:
 * required: true
 * content:
 *  application/json:
 *   schema:
 *    $ref: '#/components/schemas/Liste'
 *  
 */

router.post('/',[body("titre").notEmpty().withMessage("le titre est requis")],addList)

export default router