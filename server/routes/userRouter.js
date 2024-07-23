import express from 'express'
import multer from 'multer'
import { userController } from '../controllers/user_controllers.js'
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

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', authMiddleware, userController.current)
router.get('/users/:id', authMiddleware, userController.getById)
router.put(
  '/users/:id',
  authMiddleware,
  uploads.single('avatar'),
  userController.update
)

export default router
