import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/movie/:id' element={<h1>particular movie from routers </h1>}></Route>
          <Route path='/movies/:type' element={<h1>many movies from routers index</h1>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
