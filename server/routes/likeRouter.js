import express from 'express'
import multer from 'multer'
import { likeController } from '../controllers/like_controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const uploadDestination = 'uploads'

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, next) {
    next(null, file.originalname)
  },
})

const uploads = multer({ storage: storage })

const router = express.Router()

router.post('/', authMiddleware, likeController.like)
router.delete('/:id', authMiddleware, likeController.unlike)

export default router
