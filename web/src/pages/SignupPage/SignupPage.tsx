import { Metadata } from '@redwoodjs/web'
import Signupbanner from '../../../public/images/bannerimages/signupbanner.png'
import Navbar from 'src/components/Navbar/Navbar'
import Reusableinput from 'src/components/Reusableinput/Reusableinput'
import Button from 'src/components/Button/Button'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Toster from 'src/components/Toster/Toster'
import { notifications, Notifications } from '@mantine/notifications'
import { navigate, routes } from '@redwoodjs/router'
import axiosInstance from 'src/lib/apiClient'

interface SignupFormData {
  name: string
  email: string
  password: string
}

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()
  const onSubmit = async (data: SignupFormData) => {
    console.log('Form Data Submitted:', data)
    try {
      const response = await axiosInstance.post(`${process.env.REDWOOD_ENV_API_URL}/signup`,data);
      Toster({ message: response.data.message, title: 'Success' })
      navigate(routes.login())
    } catch (error) {
      Toster({ message: error.response?.data?.message, title: 'Failure' })
    }
  }

  return (
    <>
      <Metadata title="Signup" description="Signup page" />
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
            <p className="text-3xl font-bold">Create an account</p>
            <p>Enter your details below</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <Reusableinput
                    {...field}
                    placeholder="Name"
                    error={errors.name?.message}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

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
              <Button label="Create Account" type="submit" />
            </div>
          </form>

          <div className="flex flex-row justify-center">
            Already have an account? {'   '}
            <a href="/login" className="pl-2 underline hover:cursor-pointer">
              Log in{' '}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage
