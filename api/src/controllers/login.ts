import { login } from 'src/services/users/login'

interface LoginInput {
  email: string
  password: string
}

export const authenticateUser = async ({ input }: { input: LoginInput }) => {
  try {
    const { user, token } = await login(input)
    return { user, token }
  } catch (error) {
    throw new Error('Error logging in')
  }
}
