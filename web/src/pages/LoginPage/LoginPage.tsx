import { Metadata } from '@redwoodjs/web'
import Signupbanner from '../../../public/images/bannerimages/signupbanner.png'
import Navbar from 'src/components/Navbar/Navbar'
import Reusableinput from 'src/components/Reusableinput/Reusableinput'
import Button from 'src/components/Button/Button'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from 'src/context/AuthContext'
import { navigate, routes } from '@redwoodjs/router'
import ProfilePage from '../ProfilePage/ProfilePage'
import Toster from 'src/components/Toster/Toster'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage = () => {
  const { login } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const onSubmit = async (data: LoginFormData) => {
    console.log('Form Data Submitted:', data)
    try {
      const response = await axios.post('http://localhost:8915/login', {
        Headers: {
          'Content-Type': 'application/json',
        },
        data,
      })
      localStorage.setItem('token', response.data.token)
      const token = response.data.token
      if (token) {
        login(token)
        Toster({ message: response.data.message, title: 'Success' })
      }
    } catch (error) {
      Toster({ message: error.response?.data?.message, title: 'Failure' })
    }
  }

  return (
    <>
      <Metadata title="Login " description="Login Page" />
      <div className="flex h-[50px] w-[100vw] flex-row items-center justify-center bg-[black] text-white">
        <p className="text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="pl-[5px] underline">Shop now</span>
        </p>
      </div>
      <Navbar />
      <div className="mt-[48px] flex flex-row gap-8">
        <div className="w-[60%]">
          <img className="h-[550px]" src={Signupbanner} alt="Signup Banner" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-bold">
              Enter Your account crentials to login{' '}
            </p>
            <p>Enter your details below</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <Reusableinput
                    {...field}
                    placeholder="Email"
                    error={errors.email?.message}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <Reusableinput
                    {...field}
                    placeholder="Password"
                    type="password"
                    error={errors.password?.message}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-row justify-center">
              <Button label="Login" type="submit" />
            </div>
          </form>
          <div className="flex flex-row justify-center">
            Don't have an account ?{' '}
            <a href="/signup" className="pl-2 underline">
              Create Here !
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
