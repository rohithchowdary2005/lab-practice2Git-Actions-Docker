import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from './config';
import '../styles/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [allMovies, setAllMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${config.url}/all`);
      setMovies(response.data);
      setAllMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setMovies(allMovies);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredMovies = allMovies.filter(movie => {
      if (searchField === 'all') {
        return (
          movie.title.toLowerCase().includes(query) ||
          movie.director.toLowerCase().includes(query) ||
          movie.genre.toLowerCase().includes(query) ||
          movie.movieId.toString().includes(query) ||
          movie.releaseYear.toString().includes(query) ||
          movie.rating.toString().includes(query)
        );
      }
      
      if (searchField === 'movieId') {
        return movie.movieId.toString().includes(query);
      }
      
      return movie[searchField].toString().toLowerCase().includes(query);
    });
    
    setMovies(filteredMovies);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`${config.url}/delete/${id}`);
        alert('Movie deleted successfully!');
        fetchMovies(); // Refresh the list
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie');
      }
    }
  };

  const handleEdit = (movieId) => {
    navigate(`/update-movie/${movieId}`);
  };

  return (
    <div className="movie-list">
      <h2>Movies Collection</h2>
      <div className="search-container">
        <select 
          value={searchField} 
          onChange={(e) => setSearchField(e.target.value)}
          className="search-select"
        >
          <option value="all">Search All Fields</option>
          <option value="movieId">Movie ID</option>
          <option value="title">Title</option>
          <option value="director">Director</option>
          <option value="genre">Genre</option>
          <option value="releaseYear">Release Year</option>
          <option value="rating">Rating</option>
        </select>
        <input
          type={searchField === 'movieId' || searchField === 'releaseYear' || searchField === 'rating' ? 'number' : 'text'}
          placeholder={`Search by ${searchField === 'all' ? 'any field' : searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === '') {
              setMovies(allMovies);
            }
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
        {searchQuery && <button onClick={() => {
          setSearchQuery('');
          setMovies(allMovies);
        }}>Show All</button>}
      </div>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.movieId} className="movie-card">
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Rating:</strong> {movie.rating} ⭐</p>
              <p><strong>Year:</strong> {movie.releaseYear}</p>
              <div className="movie-actions">
                <button onClick={() => handleEdit(movie.movieId)} className="edit-btn">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => handleDelete(movie.movieId)} className="delete-btn">
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;