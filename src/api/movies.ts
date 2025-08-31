interface addUpdateMovieProps {
   id?: string;
   title: string;
   poster: string
   publishingYear: string;
}

export const moviesListAPI = async (pageNumber?: number, pageSize?: number) => {

}

export const movieDetailsAPI = async (movieId: string) => {

}

export const addMovieAPI = async (movieData: addUpdateMovieProps) => {

}

export const updateMovieAPI = async (movieData: addUpdateMovieProps) => {

}