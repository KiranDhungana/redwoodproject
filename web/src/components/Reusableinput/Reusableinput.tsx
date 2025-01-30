import { Input, InputProps } from '@mantine/core';

interface ReusableInputProps extends InputProps {
  placeholder: string;
  type?:string
}

const ReusableInput: React.FC<ReusableInputProps> = ({ className, placeholder, type ,...props}) => {
  return (
    <div>
      <Input
        className={`reusable-input ${className || ''}`}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  );
};

export default ReusableInput;
