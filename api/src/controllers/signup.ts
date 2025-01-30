import { db } from 'src/lib/db'
import { signup } from 'src/services/users/signup'


interface SignupInput {
  name: string
  email: string
  password: string
}

export const createUser = async ({ input }: { input: SignupInput }) => {
  try {
    const user = await signup(input)
    return user
  } catch (error) {
    throw new Error('Error signing up')
  }
}


export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch (error) {
    throw new Error('Error checking email')
  }
}
