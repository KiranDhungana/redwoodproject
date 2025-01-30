import FavouriteOutlined from '../../../public/images/icons/heart.svg'
import FavouriteFilled from '../../../public/images/icons/heartfilled.svg'
import Eye from '../../../public/images/icons/eye.svg'
import Review from '../../../public/images/icons/review.png'

import React, { useState } from 'react'
import EyeImageViewer from '../Modal/Modal'
import axios from 'axios'
import Toster from '../Toster/Toster'

interface ProductCardProps {
  discount: number
  productImage: string
  productName: string
  originalPrice: number
  reviewCount: number
  reviewStars: number
  id:number
}

const ProductCard: React.FC<ProductCardProps> = ({
  discount,
  productImage,
  productName,
  originalPrice,
  reviewCount,
  reviewStars,
  id
}) => {
  const [isFavourite, setIsFavourite] = useState(false)

  const toggleFavourite = () => {
    setIsFavourite((prev) => !prev)
  }
  const addToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('User not authenticated')
        return
      }
      const response = await axios.post(
        'http://localhost:8915/addtocart',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 201) {
        console.log('Product added to cart successfully')
        Toster({ message: response.data.message, title: 'Success' })
      }
    } catch (error) {
      console.error('Error adding product to cart:', error)
        Toster({ message: error.response.data.message, title: 'Failure' })
    }
  }

  return (
    <div>
      <div className="product-card relative h-[300px] w-[300px] rounded-sm bg-[#F5F5F5]">
        <div className="text absolute top-[8px] ml-[8px] w-[40px] rounded-sm bg-[#db4444] text-white">
          <p className="ml-2 text-[14px]">{discount}%</p>
        </div>
        <div className="flex flex-col">
          <div
            className="absolute right-[8px] top-[8px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:cursor-pointer"
            onClick={toggleFavourite}
          >
            <img
              className="h-[24px] w-[24px]"
              src={isFavourite ? FavouriteFilled : FavouriteOutlined}
              alt="Favourite"
            />
          </div>
          <EyeImageViewer imageSrc={productImage} />
        </div>
        <div className="absolute left-[30%] top-[20%] h-[172px] w-[172px]">
          <img src={productImage} alt={productName} />
        </div>
        <div onClick={() => addToCart(id)} className="add-to-cart">
          <p className="add-to-cart-text">Add to cart</p>
        </div>
      </div>
      <div className="flex w-[300px] flex-col gap-2 ">
        <p className="mt-4 font-semibold">{productName}</p>
        <div className="flex flex-row gap-2">
          <p className="font-semibold text-[#db4444] ">
            ${originalPrice - (discount / 100) * 100}
          </p>
          <p className="originalprice semi-bold font-semibold text-[#AAAAAA] line-through">{`$${originalPrice}`}</p>
        </div>
        <div className="flex flex-row items-center gap-2 ">
          <div className="flex flex-row gap-1">
            {Array.from({ length: reviewStars }).map((_, index) => (
              <div key={index}>
                <img src={Review} alt="Review image" />
              </div>
            ))}
          </div>
          <div className="font-semibold text-[#AAAAAA]">{`(${reviewCount})`}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
