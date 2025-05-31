import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

// app config
const app = express()
const PORT = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true,
}));
app.use(express.json())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING congratssss!')
})

app.listen(PORT, () => {
  console.log("server started congratssss", PORT)
})
