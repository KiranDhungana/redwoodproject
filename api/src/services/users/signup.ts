import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'

interface SignupInput {
  name: string
  email: string
  password: string
}

export const signup = async ({ name, email, password }: SignupInput) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return user
}
