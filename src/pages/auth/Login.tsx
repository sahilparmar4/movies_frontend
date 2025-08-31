import React from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { boolean, object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomError from '../../components/CustomError';

const Login = () => {
  const navifagate = useNavigate();
  const loginSchema = object().shape({
      email: string().required('Email is required').email('Invalid email format'),
      password: string().required('Password is required'),
      rememberMe: boolean().optional()
    })
  
    const {values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, touched} = useFormik({
      initialValues: {
        email: '',
        password: '',
        rememberMe: false
      },
      validationSchema: loginSchema,
      onSubmit: async(values) => {
        console.log(values)
      }
    })
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <h1 className="text-text-primary heading-2">Sign in</h1>
      <form className="flex flex-col gap-4 mt-8 w-full max-w-sm" onSubmit={handleSubmit}>
        <div className='mb-4'>
          <CustomInput type="email" placeholder="Email" name='email' onChange={handleChange} value={values?.email} onBlur={handleBlur}  />
            {
              touched?.email && errors?.email &&
              <CustomError isError={touched?.email || errors?.email} message={errors?.email} />
            }
        </div>
        <div className='mb-4'>
          <CustomInput type="password" placeholder="Password" name='password' onChange={handleChange} value={values?.password} onBlur={handleBlur} />
            {
              touched?.password && errors?.password &&
              <CustomError isError={touched?.password || errors?.password} message={errors?.password} />
            }
        </div>
        <div className='mb-4'>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="appearance-none w-4 h-4 rounded-[5px] !bg-bg-input checked:!bg-green-500 checked:!border-green-500"
            />
            <label
              htmlFor="rememberMe"
              className="text-text-primary body-sm ml-2"
            >
              Remember Me
            </label>
          </div>
            {
              touched?.rememberMe && errors?.rememberMe &&
              <CustomError isError={touched?.rememberMe || errors?.rememberMe} message={errors?.rememberMe} />
            }
        </div>
        <CustomButton
          type="submit"
          title="Login"
          customClasses="mt-2 body-sm py-4"
          isDisabled={false}
        />
      </form>
    </div>
  )
}

export default Login
