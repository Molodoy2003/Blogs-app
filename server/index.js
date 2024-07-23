import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import commentRouter from './routes/commentRouter.js'
import followRouter from './routes/followRouter.js'
import likeRouter from './routes/likeRouter.js'
import postRouter from './routes/postRouter.js'
import userRouter from './routes/userRouter.js'

dotenv.config()
const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// middleware
app.use('/api/auth', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likeRouter)
app.use('/api/follows', followRouter)

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.vq4duaw.mongodb.net/it-academy-project?retryWrites=true&w=majority&appName=Cluster0`
    )

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
