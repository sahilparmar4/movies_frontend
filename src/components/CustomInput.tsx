import React from 'react'

interface customInputProps {
  type: string;
  placeholder: string;
  customClasses?: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

const CustomInput: React.FC<customInputProps> = ({ type, placeholder, customClasses, name, value, onChange, onBlur }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className='p-4 body-sm rounded-[10px] bg-primary-background text-text-primary placeholder:text-text-primary bg-bg-input w-full'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

    </>
  )
}

export default CustomInput
