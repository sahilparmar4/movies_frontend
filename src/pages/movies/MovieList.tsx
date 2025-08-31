import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton';

const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  return (
    <>
      {
        moviesData?.length > 0 ?
          <>

          </> :
          <>
            <div className='flex justify-center items-center flex-col'>
              <h3 className='heading-3 text-text-primary'>Your movie list is empty</h3>
              <CustomButton
                title='Add a new movie'
                customClasses='mt-6 btn-primary w-full py-4 text-semi-bold'
                isDisabled={false}
                type='button'
                path='/movies/add'
              />
            </div>
          </>
      }
    </>
  )
}

export default MovieList
