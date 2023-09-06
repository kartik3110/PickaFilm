import './Rating.css'
export default function Rating({ movie }) {
    return (
        <span className="rating">{(movie.vote_average + 1) / 2}
            <i class="fa-solid fa-star"></i>
        </span>
    )
}