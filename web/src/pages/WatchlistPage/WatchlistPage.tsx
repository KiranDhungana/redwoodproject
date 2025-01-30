import { useEffect, useRef, useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { NavLink } from '@mantine/core'
import Navbar from 'src/components/Navbar/Navbar'
import Label from 'src/components/Label/Label'
import Timer from 'src/components/Timer/Timer'
import ProductCard from 'src/components/Productcard/Productcard'
import { Carousel } from '@mantine/carousel'
import axios from 'axios'
import Laptop from '../../../public/images/bannerimages/laptop.jpg'
import Bike from '../../../public/images/bannerimages/bike.jpeg'
import Favourite from '../../../public/images/icons/heart.svg'
import Eye from '../../../public/images/icons/eye.svg'
import '@mantine/carousel/styles.css'
import Chair from '../../../public/images/productimages/chair.png'
import ArrowLeft from '../../../public/images/icons/arrowleft.png'
import ArrowRight from '../../../public/images/icons/arrowright.png'
import Button from 'src/components/Button/Button'
import Modalcomponent from 'src/components/Modal/Modal'
import EyeImageViewer from 'src/components/Modal/Modal'

const navLinks = [
  { label: 'Womens Fashion', href: '#required-for-focus' },
  { label: 'Mens Fashion', href: '#required-for-focus' },
  { label: 'Home & Lifestyle', href: '#required-for-focus' },
  { label: 'Electronics', href: '#required-for-focus' },
  { label: 'Medicine', href: '#required-for-focus' },
  { label: 'Health and Beauty', href: '#required-for-focus' },
  { label: "Baby's and Toys", href: '#required-for-focus' },
  { label: 'Groceries & Pets', href: '#required-for-focus' },
]

const WatchlistPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8915/getcartitem', {
          headers: {
            'Content-Type': 'application/json',
            authorization : `Bearer ${token}`
          },
        })
        console.log(response.data)
        setProducts(response.data.cartItems)

      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200
    }
  }
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200
    }
  }
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div className="flex h-[50px] w-[100vw] flex-row items-center justify-center bg-[black] text-white">
        <p className="text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="pl-[5px] underline">Shop now</span>
        </p>
      </div>
      <Navbar />

      <div className="mx-[132px] mt-[48px]">
        <div className="flex flex-row gap-4">
          <Label text="My Watchlist"></Label>
        </div>
        <div className="mt-4 flex flex-row items-center justify-between  ">

        </div>
        <div className="h-[18px]"></div>
        <div
          ref={scrollRef}
          className="image-slider mt-4 flex  flex-row gap-4 overflow-x-auto  "
        >
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
              id={product.id}
                key={product.id}
                discount={product.discountPercentage}
                productImage={Chair}
                productName={product.name}
                originalPrice={product.price}
                reviewCount={product.review}
                reviewStars={product.reviewstars}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

      </div>
    </>
  )
}

export default WatchlistPage
