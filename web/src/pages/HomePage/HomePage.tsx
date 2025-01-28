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

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8912/getproduct', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
   const scrollRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  }
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };
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
      <div className="mx-[124px] flex flex-row">
        <div className="flex flex-col border-r-[2px] pt-[8px] font-semibold">
          {navLinks.map((link, index) => (
            <NavLink
              className="w-[250px]"
              key={index}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>
        <div>
          <Carousel withIndicators height={300} ml={24} mt={24}>
            <Carousel.Slide>
              <img src={Laptop} alt="Laptop" />
            </Carousel.Slide>
            <Carousel.Slide>
              <img src={Bike} alt="Bike" />
            </Carousel.Slide>
          </Carousel>
        </div>
      </div>
      <div className="mx-[132px] mt-[48px]">
        <div className="flex flex-row gap-4">
          <Label text="Today's"></Label>
        </div>
        <div className="mt-4 flex flex-row items-center justify-between  ">
          <Timer targetDate="jan 29, 2025" targetTime="18:00:00" />
          <div className="flex flex-row gap-8">
            <div onClick={handleScrollRight} className=" hover:cursor-pointer h-[40px] w-[40px] rounded-[50px] bg-[#E5E5E5]  ">
              <img className='ml-[12px] mt-[12px]'  src={ArrowLeft} />
            </div>

            <div  onClick={handleScrollLeft} className=" hover:cursor-pointer h-[40px] w-[40px] rounded-[50px] bg-[#E5E5E5]  ">
              <img className='ml-[12px] mt-[12px]' src={ArrowRight} />
            </div>
          </div>
        </div>
        <div className="h-[18px]"></div>
        <div ref={scrollRef} className="image-slider mt-4 flex  flex-row gap-4 overflow-x-auto  ">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
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
        <div className='flex flex-row justify-center my-8 ' >
<Button onClick={()=>{}} label='View All Products' ></Button>
        </div>
</div>
    </>
  )
}

export default HomePage
