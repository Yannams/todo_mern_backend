import { validationResult } from "express-validator";
import User from "../models/User.js";

export const addTask = async (req, res) => {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    const { listeId, titre } = req.body;

    try{
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non connecté" });
        }

        // Trouver la liste
        const liste = user.listes.id(listeId);
        if (!liste) {
            return res.status(404).json({ message: "Liste introuvable" });
        }

        // Ajouter la tâche (Mongoose génère _id tout seul)
        const newTask = { titre, statut:"en cours" };
        liste.taches.push(newTask);

        await user.save();

        // récupérer la dernière tâche insérée (avec _id)
        const savedTask = liste.taches[liste.taches.length - 1];

       res.status(201).json({   
            message: "Tâche ajoutée avec succès",
            tache: {
                id:savedTask._id,
                titre:savedTask.titre,
                statut:savedTask.statut
            },   // contient _id + titre + done
            listeId: listeId
        });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

export const statusTask = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { id } = req.params;      // id de la tâche
    const { listId, statut } = req.body; // statut envoyé par front
    const userId = req.user.id;
    if (!["en cours", "terminé"].includes(statut)) {
        return res.status(400).json({ message: "Statut invalide" });
    }  
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        
        const list = user.listes.id(listId);
        if (!list) return res.status(404).json({ message: "Liste non trouvée" });

        const task = list.taches.id(id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        task.statut = statut;  // mettre le statut en "en cours" ou "terminé"
        await user.save();

        res.status(201).json({ message: "Tâche mise à jour", task:{
            id:task._id,
            titre:task.titre,
            statut:task.statut
        } });
    } catch (error) {
        res.status(500).json({message:'erreur serveur'})
    }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params;      // id de la tâche
  const { listId } = req.body;    // id de la liste
  const userId = req.user.id;     // supposons middleware auth

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  const list = user.listes.id(listId);
  if (!list) return res.status(404).json({ message: "Liste non trouvée" });

  const task = list.taches.id(id);
  if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    
  list.taches = list.taches.filter(task => task.id !== id); // supprime la tâche
  await user.save();

  res.json({ message: "Tâche supprimée", taskId: id });
};