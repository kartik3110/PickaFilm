import { useState } from "react"
import { Link } from "react-router-dom";
import './NavSearch.css'


// const fetch = require('node-fetch');

// const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 21">
// <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
// </svg>
// const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
//     <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
// </svg>


export default function NavSearch() {
    const [suggestionArray, setSuggestionArray] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const clearInput = () => {
        setSuggestionArray([])
        setSearchInput('')
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let movieData;
        const keyWord = searchInput;
        if(searchInput === '') return;
        const getMovieData = async () => {
            const url = `https://api.themoviedb.org/3/search/movie?query=${keyWord}&language=en-US&page=1`;
            // console.log(url);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWEwMzUwMjFjYWZmNDUwZTZmMTBiZjgxMDM0OWY3MCIsInN1YiI6IjY0ZWQ3NTBmMWZlYWMxMDExYjJmM2Y0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cA26OYeNmvFGxERQypAo5RiIBKsr1NGph8QCsHdLrFo'
                }
            };
            try{
                const res = await fetch(url, options)
                const json = await res.json();
                movieData = json.results;
                setSuggestionArray(prevState => {
                    let newState = [...prevState]
                    for(let i = 0; i < 3; i++)
                    {  
                        newState.push(movieData[i])
                    }
                    return newState
                })
            }

            catch(err){
                console.error('error:' + err);
            }
        }
        getMovieData();

    }
    return (
        <div className="search" style={{ position: 'relative' }}>
            <form action="" onSubmit={handleSearch}>
                <input placeholder='Search Movies..' value={searchInput} type="text" className='search-input' onChange={handleChange}/>
                <button id='search-button' type="button" onClick={clearInput}>
                    x
                </button>
            </form>
            {suggestionArray.length > 0 && (
                <ul className="suggestions">
                    {suggestionArray.map(movie => {
                        const id = movie.id;
                        return (
                            <li key={id}>
                                <Link to={`/movie/${id}`} style={{textDecoration: 'none', color:'white'}}>
                                    {movie.title}
                                </Link>
                            </li>
                        )
                    })}
                {/* <li>first suggestion</li>
                <li>second suggestion</li>
                <li>third suggestion</li> */}
            </ul>
            )}
        </div>
    )
}