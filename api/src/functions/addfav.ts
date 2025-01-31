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
      const authHeader = event.headers['authorization']
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

      // Check if item already exists in favorites
      const existingItem = await db.favouriteItem.findFirst({
        where: {
          userId,
          productId,
        },
      })

      if (existingItem) {
        return {
          statusCode: 409, // Conflict status
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Item is already in favourites' }),
        }
      }

      // Add item to favourites
      const favouriteItem = await db.favouriteItem.create({
        data: {
          userId,
          productId,
        },
      })

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Item added to Favourite', favouriteItem }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          message: 'Error adding item to favourite',
          error: error.message,
        }),
      }
    }
  }

  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  }
}
