import express from 'express'
import multer from 'multer'
import { postController } from '../controllers/post_contoller.js'
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

router.post('/', authMiddleware, postController.create)
router.get('/', authMiddleware, postController.getAll)
router.get('/:id', authMiddleware, postController.getOneById)
router.delete('/:id', authMiddleware, postController.delete)

export default router
