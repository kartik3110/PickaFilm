import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import MovieList from "./pages/MovieList/MovieList.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movies/:type" element={<MovieList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
