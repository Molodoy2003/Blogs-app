import * as avatars from '@dicebear/avatars'
import * as style from '@dicebear/avatars-identicon-sprites'
import bcrypt from 'bcrypt'
import fs from 'fs-extra'
import jwt from 'jsonwebtoken'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import prisma from './../prisma/prisma-client.js'

class UserController {
  async register(req, res) {
    try {
      const { email, password, name } = req.body

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Заполните все поля!' })
      }

      const isExistingUser = await prisma.user.findUnique({ where: { email } })
      if (isExistingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' })
      }

      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)

      const __filename = fileURLToPath(import.meta.url)
      const __dirname = dirname(__filename)

      const svg = avatars.createAvatar(style, { seed: name, size: 200 })
      const avatarName = `${name}.svg`
      const avatarPath = path.join(__dirname, '../uploads', avatarName)

      await fs.ensureDir(path.dirname(avatarPath))
      await fs.writeFile(avatarPath, svg)

      const user = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
          name,
          avatarUrl: `/uploads/${avatarName}`,
        },
      })

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '30d',
        }
      )

      res.status(200).json({ message: 'Пользователь  создан!', user, token })
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при регистрации' })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' })
      }

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль' })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Неверный логин или пароль' })
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '30d',
        }
      )

      res.status(200).json({ message: 'Вход выполнен успешно', token })
    } catch (error) {
      return res.status(402).json({ message: 'Ошибка при входе' })
    }
  }

  async current(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
        include: {
          followers: {
            include: {
              follower: true,
            },
          },
          following: {
            include: {
              following: true,
            },
          },
        },
      })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      res.status(200).json(user)
    } catch (error) {
      return res.status(402).json({ message: 'Ошибка при получении user' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { email, name, bio, location, dateOfBirth } = req.body

      // let filePath
      // if (req.file && req.file.path) {
      //   filePath = req.file.path
      // }

      if (id !== req.user.userId) {
        return res.status(403).json({ message: 'Нет доступа к изменениям' })
      }

      if (email) {
        const isExistingUser = await prisma.user.findFirst({
          where: { email },
        })

        if (isExistingUser && isExistingUser.id !== id) {
          return res.status(400).json({ message: 'Email уже используется' })
        }
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          email: email || undefined,
          name: name || undefined,
          // avatarUrl: filePath ? `/${filePath}` : undefined,
          bio: bio || undefined,
          dateOfBirth: dateOfBirth || undefined,
          location: location || undefined,
        },
      })

      res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: 'Ошибка при изменении пользователя' })
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params
      const userId = req.user.userId

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          followers: true,
          following: true,
        },
      })

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      const isFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            {
              followerId: userId,
              followingId: id,
            },
          ],
        },
      })

      res.status(200).json({ ...user, isFollowing: Boolean(isFollowing) })
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка при получении user' })
    }
  }
}

export const userController = new UserController()
