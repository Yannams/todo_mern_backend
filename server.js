import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import listeRoutes from './routes/listeRoutes.js'
import tacheRoutes from './routes/tacheRoutes.js'
import { auth } from './middleware/auth.js'

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

app.use('/api/users',userRoutes)
app.use('/api/list',auth,listeRoutes)
app.use('/api/task',auth,tacheRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));