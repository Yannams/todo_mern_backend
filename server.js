import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import listeRoutes from './routes/listeRoutes.js'
import tacheRoutes from './routes/tacheRoutes.js'
import { auth } from './middleware/auth.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

dotenv.config()
const app = express ()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Documentation de l'API Todo avec Swagger",
    },
    servers: [
      { 
        url: "http://localhost:3000/api" 
    },
      {
        url: "https://todo-mern-backend-kdh4.onrender.com/api", // base url de ton API
      },
    ],
  },
  apis: ["./routes/*.js"], // où Swagger va chercher les commentaires (ex : fichiers routes)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users',userRoutes)
app.use('/api/list',auth,listeRoutes)
app.use('/api/task',auth,tacheRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));