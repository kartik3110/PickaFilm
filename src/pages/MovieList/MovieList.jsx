import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import './MovieList.css'

export default function MovieList() {
    const [popularMovies, setPopularMovies] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const { type } = useParams();
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${type || 'popular'}?language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWEwMzUwMjFjYWZmNDUwZTZmMTBiZjgxMDM0OWY3MCIsInN1YiI6IjY0ZWQ3NTBmMWZlYWMxMDExYjJmM2Y0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cA26OYeNmvFGxERQypAo5RiIBKsr1NGph8QCsHdLrFo'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setPopularMovies(data.results)
                // setIsLoading(false)
            })
            .catch(err => console.error('error:' + err));
    }, [type])


    return (
        <>
            <h1>{type === 'top_rated' ? 'Top Rated'
                : type === 'popular' ? 'Popular'
                    : type === 'upcoming' ? 'Upcoming'
                        : type === 'now_playing' ? 'Now Playing'
                            : ''} Movies</h1>
            <div className="movie-list">
                {
                    popularMovies.map(movie => {
                        return (
                            <Card movie={movie} key={movie.id} />
                        )
                    })
                }
            </div>
        </>
    )
}