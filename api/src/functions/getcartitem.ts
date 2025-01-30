import { db } from 'src/lib/db'
import { verifyToken } from 'src/lib/jwt'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  try {
     const authHeader = event.headers['authorization']
       const token = authHeader.split(' ')[1]
      const { userId } = verifyToken(token)
      if (!userId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'userId is required' }),
      }
    }

    const cartItems = await db.cartItem.findMany({
      where: { userId: Number(userId) },
    })

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ cartItems }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Server Error', error: error.message }),
    }
  }
}

