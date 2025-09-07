import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mixed, number, object, string } from 'yup'
import { addMovieAPI, movieDetailsAPI, updateMovieAPI } from '../../api/movies'
import CustomButton from '../../components/CustomButton'
import CustomError from '../../components/CustomError'
import CustomFileInput from '../../components/CustomFileInput'
import CustomInput from '../../components/CustomInput'

interface MovieProps {
  title: string
  action: "add" | "update" | "view"
}

const AddUpdateMovie: React.FC<MovieProps> = ({ title, action }) => {
  const navgate = useNavigate()
  const params = useParams()
  const movieAddUpdateSchema = object().shape({
    title: string().required('Title is required'),
    publishingYear: number().required('Publishing Year is required'),
    poster: mixed()
      .nullable()
      .required("Poster is required")
      .test("fileType", "Only image files are allowed", (value: any) => {
        return value ? ["image/jpeg", "image/png", "image/jpg", "image/heic"].includes(value?.type) : true;
      }),
  })

  const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues: {
      title: '',
      publishingYear: undefined as unknown as number,
      poster: null as unknown as File,
    },
    validationSchema: movieAddUpdateSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("publishingYear", values.publishingYear.toString())

      if (values.poster) {
        formData.append("poster", values.poster as File) 
      }
      if(action === "add") {
        mutate(formData)
      } else {
        updateDetails(formData)
      }
    }

  })

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => addMovieAPI(formData),
    onSuccess: (data: any) => {
      toast(data?.message || "Movie added successfully", { type: "success" })
      navgate("/movies")
    },
    onError: (error: any) => {
      toast(error?.message || "Something went wrong. Please try again.", { type: "error" })
    }
  })

  const { mutate: updateDetails, isPending: updateIsPending } = useMutation({
    mutationFn: (formData: FormData) => updateMovieAPI(params?.id as string, formData),
    onSuccess: (data: any) => {
      toast(data?.message || "Movie updated successfully", { type: "success" })
      navgate("/movies")
    },
    onError: (error: any) => {
      toast(error?.message || "Something went wrong. Please try again.", { type: "error" })
    }
  })

  const {isFetching, isLoading, isSuccess, isError, data} = useQuery({
    queryKey: ["movie-detail", params?.id],
    queryFn: ()=> movieDetailsAPI(params?.id as string),
    enabled: action === "view" || action === "update"
  })

  useEffect(()=>{
    console.log(data?.data)
    setFieldValue("title", data?.data?.title)
    setFieldValue("publishingYear", data?.data?.releaseYear)
  }, [isFetching, isLoading, isSuccess, isError, data])
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
              disabled={action === "view"}
            />
            {
              touched?.title && errors?.title &&
              <CustomError isError={touched?.title || errors?.title} message={errors?.title} />
            }
          </div>
          <div className='mb-6'>
            <CustomInput
              placeholder='Publishing Year'
              type='number'
              name='publishingYear'
              value={values.publishingYear}
              onChange={(e) => setFieldValue('publishingYear', parseInt(e.target.value))}
              onBlur={handleBlur}
              minValue={1900}
              disabled={action === "view"}
            />
            {
              touched?.publishingYear && errors?.publishingYear &&
              <CustomError isError={touched?.publishingYear || errors?.publishingYear} message={errors?.publishingYear} />
            }
          </div>
          <CustomFileInput
            name='poster'
            setFieldValue={setFieldValue}
            existingFileUrl={action === "add" ? "" : `${(import.meta as any).env?.VITE_APP_BASE_URL_IMAGE}${data?.data?.poster}`}
            disabled={action === "view"}
          />
          {
            touched?.poster && errors?.poster &&
            <CustomError isError={touched?.poster || errors?.poster as any} message={errors?.poster as any} />
          }
          {
            action !== "view" &&
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
                isDisabled={action === "add" ? isPending : updateIsPending}
                customClasses='py-4'
              />
            </div>
          }
        </form>
      </div>
    </>
  )
}

export default AddUpdateMovie
