import { db } from 'src/lib/db'
import { verifyToken } from 'src/lib/jwt'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

  if (event.httpMethod === 'POST') {
    try {
      console.log(event)
      const authHeader = event.headers['authorization']
      console.log("testing header parameter");
      console.log(authHeader);
      if (!authHeader) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Authorization token missing' }),
        }
      }

      const token = authHeader.split(' ')[1]
      const { userId } = verifyToken(token)

      if (!userId) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' }),
        }
      }

      const body = JSON.parse(event.body)
      const { productId } = body

      if (!productId) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'productId is required' }),
        }
      }

      const existingCartItem = await db.cartItem.findFirst({
        where: {
          userId,
          productId,
        },
      })

      if (existingCartItem) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'This product is already in your cart' }),
        }
      }

      const cartItem = await db.cartItem.create({
        data: {
          userId,
          productId,
        },
      })

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Item added to cart', cartItem }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Error adding item to cart', error: error.message }),
      }
    }
  }

  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  }
}
