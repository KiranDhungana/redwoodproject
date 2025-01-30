import { authenticateUser } from 'src/controllers/login'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    }
  }

  try {
    const body = JSON.parse(event.body)
    const { user, token } = await authenticateUser({ input: body.data })
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({ user, token,message:"Account Details validated Successfully" }),
    }
  } catch (error) {
    console.error('Authentication error:', error)
 return {
      statusCode: error.statusCode || 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({ message: error.message || 'Authentication failed' }),
    }
  }
}
