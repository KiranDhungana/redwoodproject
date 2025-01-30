
import { verifyToken } from "src/services/tokenverification/tokenverification"


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    }
  }

  try {
    const body = JSON.parse(event.body)
    const { token } = body

    const verificationResult = await verifyToken(token)

    if (verificationResult.valid) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({ message: 'Token validated successfully', valid: true }),
      }
    } else {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({ message: 'Invalid token', valid: false }),
      }
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      body: JSON.stringify({ message: error.message || 'Token verification failed' }),
    }
  }
}
