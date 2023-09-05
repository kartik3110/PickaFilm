import { useEffect, useState } from "react"
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";


// const fetch = require('node-fetch');

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
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
                console.log(data.results)
                setIsLoading(false);
            })
            .catch(err => console.error('error:' + err));
    }, [])
    return (
        <>

            <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={false} interval={7000}>
                {popularMovies.map((m) => {
                    return (
                        <Link to={`/movie/1`} >
                            <div className="carousel-item">
                                <img className="backdrop" src={`https://image.tmdb.org/t/p/original${m && m.backdrop_path}`} />
                                <div className="details">
                                    <div className="title" >{m.title}</div>
                                    <div className="release-date">{(m.release_date).slice(0, 7)}</div>
                                    <span className="rating">{(m.vote_average) / 2}
                                        <i class="fa-solid fa-star"></i>
                                    </span>

                                    <p className="overview">{m.overview}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </Carousel >
            {isLoading && <h1>Loading carousel..</h1>}
            <h1>Popular Movies</h1>
            {popularMovies.map(movie => {
                return (
                    <Card />
                )
            })}
        </>
    )
}