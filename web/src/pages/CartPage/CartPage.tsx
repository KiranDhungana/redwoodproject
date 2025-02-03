import { useEffect, useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { Input, Select, Table } from '@mantine/core'
import Navbar from 'src/components/Navbar/Navbar'
import Label from 'src/components/Label/Label'
import axios from 'axios'
import Monitor from '../../../public/images/productimages/monitor.png'
import Delete from '../../../public/images/icons/delete.svg'
import './cart.css'
import Button from 'src/components/Button/Button'
import { navigate, routes } from '@redwoodjs/router'
import axiosInstance from 'src/lib/apiClient'

const CartPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const discountedPrice =
        product.product.price -
        (product.product.discountPercentage / 100) * product.product.price
      return sum + discountedPrice
    }, 0)
  const truncatedTotal = Math.floor(total * 100) / 100
  setTotalAmount(truncatedTotal)
  }, [products])

  const fetchProducts = async () => {
    try {
        const response = await axiosInstance.get('/getcartitem');
      console.log(response.data)
      setProducts(response.data.cartItems || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCart = async (id: number) => {
    const token = localStorage.getItem('token')
    try {
      await axiosInstance.post('/deletecartitem',{ productId: id })
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting item from cart:', error)
    } finally {
      setLoading(false)
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
          <Label text="My Cart"></Label>
        </div>
        <div className="mt-4 flex flex-row items-center justify-between "></div>
        <div className="h-[18px]"></div>
        <div className="mt-4">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Price</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {loading ? (
                <Table.Tr>
                  <Table.Td colSpan={6}>Loading products...</Table.Td>
                </Table.Tr>
              ) : products && products.length > 0 ? (
                products.map((product) => (
                  <Table.Tr className="product-wrapper" key={product.id}>
                    <Table.Td>
                      <div className="relative ">
                        {product.product.name}
                        <div className="delete-icon absolute">
                          <img
                            onClick={() => {
                              deleteCart(product.product.id)
                            }}
                            src={Delete}
                          />
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <img
                        src={product.product.image || Monitor}
                        alt={product.product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                        }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Select
                        className="select-wrapper"
                        defaultValue="1"
                        placeholder="Pick Quantity"
                        data={['1', '2', '3', '4']}
                      />
                    </Table.Td>
                    <Table.Td>
                      $
                      {product.product.price -
                        (product.product.discountPercentage / 100) *
                          product.product.price}
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6}>No products available</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
          <div className="flex flex-row justify-between">
            <Button
              onClick={()=>{navigate("/home")}}
              label="Return To Shop"
              className="secondary-button"
            ></Button>
            <Button label="Update Cart"></Button>
          </div>
          <div className="mt-16 flex flex-row justify-between items-baseline">
            <div className="flex flex-row items-center gap-4">
              <Input
                className="apply-coupon-input"
                placeholder="Coupon Code"
              ></Input>
              <div>
                <Button label="Apply Coupon"></Button>
              </div>
            </div>
            <div className="w-[400px] rounded-md border-[2px] p-4 mb-8">
              <p className="mb-4 font-semibold">Cart Total</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between font-semibold ">
                  <div>Subtotal</div>
                  <div>${totalAmount}</div>
                </div>
                <div className="h-[1px] w-[100%] bg-slate-300 mt-4"></div>
                <div className="flex flex-row justify-between font-semibold ">
                  <div>Shipping:</div>
                  <div>$0</div>
                </div>
                <div className="h-[0.5px] w-[100%] bg-slate-300 mt-4"></div>
                <div className="flex flex-row justify-between font-semibold ">
                  <div>Sub Total:</div>
                  <div>${totalAmount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
