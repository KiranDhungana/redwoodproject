import { createUser, getUserByEmail } from 'src/controllers/signup'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...corsHeaders,
      },
      body: '',
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body)
      const { email } = body.data

      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
          body: JSON.stringify({ message: 'Email already exists' }),
        }
      }

      const user = await createUser({ input: body.data })
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({ message: 'User Account created Successfully', user }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({ message: error.message }),
      }
    }
  }

  return {
    statusCode: 405,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  }
}

module.exports = { handler }
