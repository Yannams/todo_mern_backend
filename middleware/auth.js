import jwt from "jsonwebtoken"

export const auth = (req, res, next) =>{
    const  authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
     
    if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; // { id: "id_utilisateur" }
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide" });
    }
}