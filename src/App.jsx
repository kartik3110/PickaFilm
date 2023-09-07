import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import MovieList from './pages/MovieList/MovieList'
import MovieDetail from './pages/MovieDetail/MovieDetail'
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/movie/:id' element={<MovieDetail />}></Route>
          <Route path='/movies/:type' element={<MovieList />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
