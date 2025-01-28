import { CloseButton, Input } from '@mantine/core'
import Heart from '../../../public/images/icons/heart.svg'
import Cart from '../../../public/images/icons/cart.svg'
import SearchIcon from '../../../public/images/icons/search.svg'


const Navbar = () => {
  return (
    <div className=" border-b-[2px]">
      <div className="mx-[132px] flex flex-row  justify-between items-center my-2">
        <div className="font-bold text-2xl">Exclusive</div>
        <div>
          <ul className="flex flex-row gap-4 text-[18px]">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Signup</li>
          </ul>
        </div>

        <div className="flex flex-row gap-8">
          <Input
            rightSection={<img className="icon-size" src={SearchIcon}></img>}
            placeholder="What are you looking for?"
          />
          <div className="flex flex-row gap-4 items-center">
            <img className="icon-size" src={Heart} alt="favourite_icon" />
            <img className="icon-size" src={Cart} alt="cart_icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
