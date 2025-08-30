import React from 'react'

interface customInputProps {
    type: string;
    placeholder: string;
    customClasses?: string; 
}

const CustomInput:React.FC<customInputProps> = ({type, placeholder, customClasses}) => {
  return (
    <>
        <input 
            type={type}
            placeholder={placeholder}
            className='p-4 body-sm rounded-[10px] bg-primary-background text-text-primary w-auto placeholder:text-text-primary bg-bg-input mb-2' 
        />
      
    </>
  )
}

export default CustomInput
