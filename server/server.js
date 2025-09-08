import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*', // Allow all origins. Change this to your frontend URL for security.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Explicitly allow 'token' header
}))

await connectDB()

app.use('/api/user', userRouter)
console.log("Image Routes Loaded");
app.use('/api/image', imageRouter)

app.get('/', (req, res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT))
