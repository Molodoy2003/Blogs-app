import prisma from './../prisma/prisma-client.js'

class FollowController {
  async follow(req, res) {
    try {
      const { followingId } = req.body
      const userId = req.user.userId

      if (followingId === userId) {
        return res
          .status(500)
          .json({ message: 'Вы подписываетесь сам на себя' })
      }

      const isExistFollow = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId }],
        },
      })

      if (isExistFollow) {
        return res.status(400).json({ message: 'Вы уже подписаны' })
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      })

      res.status(200).json({ message: 'Подписка успешна оформлена ' })
    } catch (error) {
      return res.status(403).json({ message: 'Ошибка при подписке' })
    }
  }
  async unfollow(req, res) {
    try {
      const { followingId } = req.body
      const userId = req.user.userId

      const isFollow = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId }],
        },
      })

      if (!isFollow) {
        return res.status(403).json({ message: 'Вы не подписаны ' })
      }

      await prisma.follows.delete({
        where: { id: isFollow.id },
      })

      res.status(200).json({ message: 'Unfollow успешно оформлен' })
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'Ошибка при unfollow' })
    }
  }
}

export const followController = new FollowController()
