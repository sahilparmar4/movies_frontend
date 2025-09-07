import { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import { moviesListAPI } from '../../api/movies';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';

const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => moviesListAPI(page),
  })

  useEffect(() => {
    if (isSuccess) {
      setMoviesData(data?.movies)
    } else if (isError) {
      toast(data?.message || error, { type: "error" })
    }
  }, [data, isFetching, isLoading, isError, isSuccess])

  return (
    <>
      <div className="pt-[80px] px-4 md:px-8 min-h-screen">
        <Header />

        {
          moviesData?.length > 0 ?
            <>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-20'>
                {moviesData?.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {moviesData?.length > 0 &&
                <div className="mt-6 flex justify-center mb-8">
                  <Pagination
                    currentPage={Number(data?.pagination?.page)}
                    onPageChange={(page: number) => setPage(page)}
                    totalPages={Number(data?.pagination?.totalPages)}
                  />
                </div>
              }
            </> :
            <div className='flex justify-center items-center flex-col mt-10'>
              <h3 className='heading-3 text-text-primary'>Your movie list is empty</h3>
              <CustomButton
                title='Add a new movie'
                customClasses='mt-6 btn-primary w-full py-4 text-semi-bold'
                isDisabled={false}
                type='button'
                path='/movies/add'
              />
            </div>
        }
      </div>
    </>
  )
}

export default MovieList
