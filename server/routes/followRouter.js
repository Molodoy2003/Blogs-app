import express from 'express'
import multer from 'multer'
import { followController } from '../controllers/follow-controller.js'
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

router.post('/', authMiddleware, followController.follow)
router.delete('/', authMiddleware, followController.unfollow)

export default router
