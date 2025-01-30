import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface LoginInput {
  email: string
  password: string
}

const SECRET = '3tmd76hvgd'

export const login = async ({ email, password }: LoginInput) => {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' })

  return { user, token }
}
