import { db } from 'src/lib/db'

export const handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    if (!data.name || !data.description || !data.price) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: name, description, or price',
        }),
      }
    }
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage || 0,
        review: data.review || 0,
        reviewstars: data.reviewstars || 0,
      },
    })

    return {
      statusCode: 201,
      body: JSON.stringify(product),
    }
  } catch (error) {
    console.error('Error creating product:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    }
  }
}
