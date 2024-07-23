import prisma from './../prisma/prisma-client.js'

class CommentController {
  async create(req, res) {
    try {
      const { postId, content } = req.body
      const userId = req.user.userId

      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          userId,
        },
      })

      res.status(200).json({ message: 'Комментарий создан', comment })
    } catch (error) {
      return res
        .status(403)
        .json({ message: 'Ошибка при создании комментария' })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      const comment = await prisma.comment.findUnique({ where: { id } })
      if (!comment) {
        return res.status(404).json({ message: 'Комментарий не найден' })
      }

      if (comment.userId !== userId) {
        return res.status(403).json({ message: 'Нет доступа к комментарию' })
      }

      await prisma.comment.delete({ where: { id } })

      res.status(200).json({ comment, message: 'Комментарий удален' })
    } catch (error) {
      return res
        .status(403)
        .json({ message: 'Ошибка при удалении комментария' })
    }
  }
}

export const commentController = new CommentController()
