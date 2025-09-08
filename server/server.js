import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())

// ✅ Fixed CORS: allow your frontend domain explicitly
app.use(cors({
    origin: ['https://image-genie-lmzc.vercel.app'], // frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}))

// ✅ Connect to database
await connectDB()

// ✅ Routes
app.use('/api/user', userRouter)
console.log("Image Routes Loaded")
app.use('/api/image', imageRouter)

// ✅ Test route
app.get('/', (req, res) => res.send("API Working"))

// ✅ Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT))
