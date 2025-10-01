import express from "express"
import { body } from "express-validator"
import { addTask, deleteTask, statusTask } from "../controllers/tacheController.js"

const router  = express.Router()

router.post(
    '/',
    [
        body("titre").notEmpty().withMessage("le titre est requis"),
        body("listeId").notEmpty().withMessage("Aucune liste trouvée")
    ],
    addTask
)

router.patch('/:id',statusTask)
router.delete('/:id',deleteTask)
export default router