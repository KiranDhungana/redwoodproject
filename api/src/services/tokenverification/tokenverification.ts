
import jwt from 'jsonwebtoken'

const JWT_SECRET = '3tmd76hvgd'

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { valid: true, decoded }
  } catch (error) {
    console.error('Error verifying token:', error)
    return { valid: false }
  }
}
