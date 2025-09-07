import React from 'react'
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    movie: any
}

const getPosterUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const base = (import.meta as any).env?.VITE_APP_BASE_URL_IMAGE || '';
    return `${base}${path}`;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate()
    const posterSrc = getPosterUrl(movie?.poster);
    console.log("Line 17", posterSrc)
    return (
        <>
            <div className="w-full max-w-[240px] rounded-[12px] bg-bg-card shadow-lg overflow-hidden relative cursor-pointer hover:bg-[#0829358C]/55" key={movie?._id}>
                <div className="w-full h-[220px] md:h-[320px] bg-gray-800">
                    <img
                        src={posterSrc}
                        alt={movie?.title || 'movie poster'}
                        className="w-full h-full object-cover block"
                    />
                </div>

                <div className="left-0 right-0 bottom-0 px-4 py-3 bg-[rgba(7,44,57,0.75)]  hover:bg-[#0829358C]/55">
                    <div className="mb-1">
                        <span className="inline-block py-2 rounded-sm text-sm text-text-primary heading-6">
                            {movie?.title}
                        </span>
                    </div>
                    <div className="text-text-primary text-sm opacity-90 mt-1 flex justify-between gap-3">
                        <span>{movie?.releaseYear}</span>
                        <span className='text-text-primary hover:underline hover:text-bg-btn-primary' onClick={() => { navigate(`/movies/${movie?._id}`) }}>View</span>
                        <span className='text-text-primary hover:underline hover:text-bg-btn-primary' onClick={() => { navigate(`/movies/update/${movie?._id}`) }}>Edit</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard
