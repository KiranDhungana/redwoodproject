import React from 'react'

interface ButtonProps {
  label: string
  className? :string
  type ?:string;
  onClick?:() => void;
}

const Button: React.FC<ButtonProps> = ({ label,className,onClick }) => {
  return (
    <button onClick={()=>{onClick()}} className={`primary-button ${className}`}  >
      {label}
    </button>
  )
}

export default Button
