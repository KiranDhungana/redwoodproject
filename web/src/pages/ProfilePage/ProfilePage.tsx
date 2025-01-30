import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useEffect } from 'react'
import Navbar from 'src/components/Navbar/Navbar'
import { useAuth } from 'src/context/AuthContext'

const ProfilePage = () => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login())
    }
  }, [isAuthenticated])
  return (
    <>
      <Metadata title="Profile" description="Profile page" />
      <div className="flex h-[50px] w-[100vw] flex-row items-center justify-center bg-[black] text-white">
        <p className="text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="pl-[5px] underline">Shop now</span>
        </p>
      </div>
      <Navbar />
    </>
  )
}

export default ProfilePage
