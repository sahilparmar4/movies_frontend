import React from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const Login = () => {
  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen'>
        <h1 className='text-text-primary heading-2'>Sign in</h1>
        <form className='flex flex-col gap-4 mt-8 w-full max-w-sm'>
            <CustomInput 
                type="email"
                placeholder='Email'
            />
            <CustomInput 
                type="password"
                placeholder='Password'
            />
            <div className='flex flex-1 justify-center items-center'>
                <input type="checkbox" id="rememberMe" name="rememberMe" className='appearance-none w-4 h-4 rounded-[5px] flex place-self-center !bg-bg-input  checked:!bg-green-500 checked:!border-green-500'/>
                <label htmlFor="rememberMe" className='text-text-primary body-sm ml-2 flex text-center'>Remember Me</label>
            </div>
            <CustomButton
                type="submit"
                title="Login"
                customClasses="mt-2"
                isDisabled={false}
            />
        </form>
      </div>
    </>
  )
}

export default Login
