import React from 'react'

interface CustomErrorProps {
    message: string;
    isError?: boolean;
}

const CustomError:React.FC<CustomErrorProps> = ({message, isError}) => {
  return (
    <>
      <div className='mt-1'>
        {isError && <p className='text-text-primary'>{`*${message}`}</p>}
      </div>
    </>
  )
}

export default CustomError
