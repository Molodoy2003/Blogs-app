import prisma from './../prisma/prisma-client.js'

class LikeController {
  async like(req, res) {
    try {
      const { postId } = req.body
      const userId = req.user.userId

      if (!postId) {
        return res.status(403).json({ message: 'Не удалось лайкнуть' })
      }

      const isExistLike = await prisma.like.findFirst({
        where: { postId, userId },
      })

      if (isExistLike) {
        res.status(400).json({ message: 'Вы уже лайкнули этот комментарий' })
      }

      const like = await prisma.like.create({
        data: {
          postId,
          userId,
        },
      })

      res.json({ message: 'Лайк поставлен', like })
    } catch (error) {
      return res.status(403).json({ message: 'Ошибка при лайке комментария' })
    }
  }
  async unlike(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      const isExistLike = await prisma.like.findFirst({
        where: { userId, postId: id },
      })

      if (!isExistLike) {
        return res.status(403).json({ message: 'Нельзя поставить дизлайк' })
      }

      const like = await prisma.like.deleteMany({
        where: {
          postId: id,
          userId,
        },
      })

      res.json(like)
    } catch (error) {
      return res.status(403).json({ message: 'Ошибка при дизлайке' })
    }
  }
}

export const likeController = new LikeController()
