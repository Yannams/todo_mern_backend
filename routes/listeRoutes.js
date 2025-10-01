import express from "express"
import { body } from "express-validator"
import { addList } from "../controllers/listeController.js"

const router  = express.Router()

router.post('/',[body("titre").notEmpty().withMessage("le titre est requis")],addList)

export default router