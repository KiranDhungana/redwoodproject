import { db } from 'src/lib/db'

export const addToCart = async ({ userId, productId }) => {
  return db.cartItem.create({
    data: {
      userId,
      productId,
    },
  })
}

export const getCartItemsByUserId = async (userId) => {
  return db.cartItem.findMany({
    where: {
      userId,
    },
  })
}

export const deleteCartItem = async (id) => {
  return db.cartItem.delete({
    where: {
      id,
    },
  })
}
