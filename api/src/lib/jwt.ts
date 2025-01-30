import jwt from 'jsonwebtoken'

const JWT_SECRET = '3tmd76hvgd'

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number }
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}
