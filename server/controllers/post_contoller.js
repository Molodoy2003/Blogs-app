import prisma from './../prisma/prisma-client.js'

class PostController {
  async create(req, res) {
    try {
      const { content } = req.body

      const authorId = req.user.userId

      if (!content) {
        return res.status(400).json({ message: 'Заполните поля' })
      }

      const post = await prisma.post.create({
        data: {
          content,
          authorId,
        },
      })

      res.status(200).json({ message: 'Пост создан', post })
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка при создании поста' })
    }
  }
  async getAll(req, res) {
    try {
      const userId = req.user.userId

      const posts = await prisma.post.findMany({
        include: {
          likes: true,
          author: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const postWithLike = posts.map(post => ({
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId),
      }))

      res.status(200).json(postWithLike)
    } catch (error) {
      return res.status(401).json({ message: 'Ошибка при получении постов' })
    }
  }
  async getOneById(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          comments: {
            include: {
              user: true,
            },
          },
          likes: true,
          author: true,
        },
      })

      if (!post) {
        return res.status(404).json({ message: 'Пост не найден' })
      }

      const postWithLike = {
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId),
      }

      res.status(200).json(postWithLike)
    } catch (error) {
      return res.status(401).json({ message: 'Ошибка при получении поста' })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params

      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      })

      if (!post) {
        return res.status(404).json({ message: 'Ошибка при удалении поста' })
      }

      if (post.authorId !== req.user.userId) {
        return res.status(403).json({ message: 'Нет доступа к посту' })
      }

      const transaction = await prisma.$transaction([
        prisma.comment.deleteMany({ where: { postId: id } }),
        prisma.like.deleteMany({ where: { postId: id } }),
        prisma.post.delete({ where: { id } }),
      ])

      res.status(200).json({ message: 'Пост удален', transaction })
    } catch (error) {
      return res.status(403).json({ message: 'Ошибка при удалении' })
    }
  }
}

export const postController = new PostController()
