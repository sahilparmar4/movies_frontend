import { request } from "../utils/request";

export const moviesListAPI = async (pageNumber?: number) => {
   const response = await request({ url: `/movies?page=${pageNumber}`, method: "GET" })
   return response?.data;
}

export const movieDetailsAPI = async (movieId: string) => {
   const response = await request({ url: `/movies/details/${movieId}`, method: "GET", })
   return response;
}

export const addMovieAPI = async (formData: FormData) => {
   const response = await request({
      url: "/movies/add", method: "POST", body: formData, headers: {
         "Content-Type": "multipart/form-data",
      },
   })
   return response;
}

export const updateMovieAPI = async (id: string, movieData: FormData) => {
   const response = await request({ url: `/movies/${id}/update`, method: "PUT", body: movieData, })
   return response;
}