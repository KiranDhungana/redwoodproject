import { CloseButton, Input, Select } from '@mantine/core'
import Heart from '../../../public/images/icons/heart.svg'
import Cart from '../../../public/images/icons/cart.svg'
import SearchIcon from '../../../public/images/icons/search.svg'
import User from '../../../public/images/icons/user.svg'
import { useAuth } from 'src/context/AuthContext'
import { useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const [Isvissible, setIsvissible] = useState(false)
  const toggleDropdown = () => {
    setIsvissible((prev) => !prev)
  }
  return (
    <div className=" border-b-[2px]">
      <div className="mx-[132px] my-2 flex  flex-row items-center justify-between">
        <div className="text-2xl font-bold">Exclusive</div>
        <div>
          <ul className="flex flex-row gap-4 text-[18px]">
            <a href="/home" className="cursor-pointer hover:underline">
              Home
            </a>
            <a className="cursor-pointer hover:underline">Contact</a>
            <a className="cursor-pointer hover:underline">About</a>
            <a href="/signup" className="cursor-pointer hover:underline">
              Signup
            </a>
            <a href="/login" className="cursor-pointer hover:underline">
              login
            </a>
          </ul>
        </div>
        <div className="flex flex-row gap-8 ">
          <Input
            rightSection={<img className="icon-size" src={SearchIcon}></img>}
            placeholder="What are you looking for?"
          />
          <div className="relative flex flex-row items-center gap-4">
            {isAuthenticated ? (
              <div className="flex flex-row gap-4">
                <img
                  className="icon-size hover:cursor-pointer"
                  src={Heart}
                  alt="favourite_icon"
                />
                <img
                  onClick={()=>{ navigate(routes.cart())}}
                  className="icon-size  hover:cursor-pointer"
                  src={Cart}
                  alt="cart_icon"
                />
                <div>
                  {' '}
                  <img
                    onClick={toggleDropdown}
                    className="icon-size  icon-size hover:cursor-pointer"
                    src={User}
                    alt="user_icon"
                  />
                  {Isvissible ? (
                    <div className="dropdown-style flex flex-col gap-2">
                      <div className="hover:cursor-pointer"> My Account</div>
                      <div className="hover:cursor-pointer">My order</div>
                      <div className="hover:cursor-pointer">My Watchlist</div>
                      <div className="hover:cursor-pointer" onClick={logout}>
                        Logout
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
