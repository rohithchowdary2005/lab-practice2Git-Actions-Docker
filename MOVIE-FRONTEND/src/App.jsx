import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import UpdateMovie from './components/UpdateMovie';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/add-movie" element={<MovieForm />} />
            <Route path="/update-movie/:id" element={<UpdateMovie />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
