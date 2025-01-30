import { db } from 'src/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:8911',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}
export const handler = async (event) => {
  try {
    const products = await db.product.findMany();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify(products),

    };
  } catch (error) {
    console.error('Error fetching products:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({ error: 'Failed to fetch products' }),
    };
  }
};
