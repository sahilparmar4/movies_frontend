import React from 'react'
import CustomInput from '../../components/CustomInput'
import CustomFileInput from '../../components/CustomFileInput'
import CustomButton from '../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import CustomError from '../../components/CustomError'

interface MovieProps {
    title: string
    action: "add" | "update" | "view"
}

const AddUpdateMovie:React.FC<MovieProps> = ({title, action}) => {  
  const navgate = useNavigate()

  const movieAddUpdateSchema = object().shape({
    title: string().required('Title is required'),
    publishingYear: string().required('Publishing Year is required'),
    poster: string().nullable().required('Poster is required')
  })

  const {values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, touched} = useFormik({
    initialValues: {
      title: '',
      publishingYear: '',
      poster: null
    },
    validationSchema: movieAddUpdateSchema,
    enableReinitialize: true,
    onSubmit: async(values) => {
      console.log(values)
    }
  })
  return (
    <>
      <div className='w-full max-w-sm'>
        <h1 className='text-text-primary heading-3 mb-6'>{title}</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <CustomInput 
              placeholder='Title'
              type='text'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              touched?.title && errors?.title &&
              <CustomError isError={touched?.title || errors?.title} message={errors?.title} />
            }
          </div>
          <div className='mb-6'>
            <CustomInput 
              placeholder='Publishing Year'
              type='text'
              name='publishingYear'
              value={values.publishingYear}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              touched?.publishingYear && errors?.publishingYear &&
              <CustomError isError={touched?.publishingYear || errors?.publishingYear} message={errors?.publishingYear} />
            }
          </div>
          <CustomFileInput
            name='poster'
            setFieldValue={setFieldValue}
          />
          {
            touched?.poster && errors?.poster &&
            <CustomError isError={touched?.poster || errors?.poster} message={errors?.poster} />
          }
        <div className='grid grid-cols-2 gap-4 mt-6'>
            <CustomButton 
              title='Cancel'
              type='reset'
              isDisabled={false}
              customClasses='py-4'
            />
            <CustomButton 
              title='Submit'
              type='submit'
              isDisabled={false}
              customClasses='py-4'
            />
        </div>
        </form>
      </div>
    </>
  )
}

export default AddUpdateMovie
