import { db } from 'src/lib/db'

export const addToFavourite = async ({ userId, productId }) => {
  return db.favouriteItem.create({
    data: {
      userId,
      productId,
    },
  })
}

export const getFavouriteItemsByUserId = async (userId) => {
  return db.favouriteItem.findMany({
    where: {
      userId,
    },
  })
}

export const deleteFromFavourite = async (id) => {
  return db.favouriteItem.delete({
    where: {
      id,
    },
  })
}
