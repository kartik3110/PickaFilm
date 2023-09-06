import { useEffect, useState } from "react";
import Card from "../card/Card"
import './MultiCarousel.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function MultiCarousel({ type }) {
    const [popularMovies, setPopularMovies] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
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
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 5 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <>
            <Carousel responsive={responsive} transitionDuration={1000}>

                {
                    popularMovies.map(movie => {
                        return (
                            <Card movie={movie} key={movie.id} />
                        )
                    })
                }
            </Carousel>
        </>
    )
}