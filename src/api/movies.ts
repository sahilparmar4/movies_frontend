import { request } from "../utils/request";

interface addUpdateMovieProps {
   id?: string;
   title: string;
   poster: string
   publishingYear: string;
}

export const moviesListAPI = async (pageNumber?: number, pageSize?: number) => {
   const response = await request({url: "", method:"GET"})
   return response;
}

export const movieDetailsAPI = async (movieId: string) => {
   const response = await request({url: "", method:"GET",})
    return response;
}

export const addMovieAPI = async (movieData: addUpdateMovieProps) => {
   const {id, ...rest} = movieData;
   const response = await request({url: "", method:"POST", body: rest})
    return response;
}

export const updateMovieAPI = async (movieData: addUpdateMovieProps) => {
   const {id, ...rest} = movieData;
   const response = await request({url: "", method:"PUT", body: rest,})
    return response;
}