import React from 'react'

interface ButtonProps {
  label: string
  className? :string
  type ?:string;
}

const Button: React.FC<ButtonProps> = ({ label, }) => {
  return (
    <button className="primary-button " >
      {label}
    </button>
  )
}

export default Button
