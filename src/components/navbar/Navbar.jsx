import './Navbar.css'
import { Link } from 'react-router-dom'
import myLogo from '../../assets/logo-pickafilm.png'
export default function Navbar() {
    return (
        <nav className='navBar'>
            <Link to='/' className='navLogo'><img src={myLogo} alt="" className='navImage' /></Link>
            <div className='links'>
                <Link to='/movies/1' className='navLink'>Popular <i class="fa-solid fa-fire"></i></Link>
                <Link to='/movies/2' className='navLink'>Top Rated <i class="fa-solid fa-arrow-trend-up"></i></Link>
                <Link to='/movies/2' className='navLink'>Upcoming <i class="fa-regular fa-calendar"></i></Link>
                <Link to='/movies/2' className='navLink'>Now Playing <i class="fa-solid fa-tv"></i></Link>
                <Link to='/movies/2' className='navLink'>Favourites <i class="fa-solid fa-heart"></i></Link>
            </div>
        </nav>
    )
}